import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const bootLogPath = path.join(__dirname, 'boot.log')

// Some host dashboards don't reliably surface stdout/stderr from the
// process they launch. Mirror every boot-stage line to a plain file next
// to server.js so it can be inspected via File Manager/SSH regardless of
// whether the dashboard's own log viewer is working.
function log(...args) {
  const line = `[${new Date().toISOString()}] ${args.join(' ')}`
  console.log(line)
  try {
    fs.appendFileSync(bootLogPath, line + '\n')
  } catch {
    // disk write is best-effort, never let logging itself crash boot
  }
}

log('[boot] server.js starting, node', process.version, 'cwd', process.cwd())

process.on('uncaughtException', (err) => {
  log('[fatal] uncaughtException:', err?.stack || String(err))
  process.exit(1)
})
process.on('unhandledRejection', (reason) => {
  log('[fatal] unhandledRejection:', reason?.stack || String(reason))
  process.exit(1)
})
// Default to production unless explicitly told this is local dev — hosts
// that run `node server.js` directly (bypassing our package.json "dev"
// script) won't set NODE_ENV themselves, and running an unbuilt dev
// server in production is worse than the reverse failure mode.
const isProduction = process.env.NODE_ENV !== 'development'
const port = process.env.PORT || 3000

// server/.env carries backend secrets (SMTP creds, etc.) and may also
// define NODE_ENV=production for the legacy standalone backend. Loading
// it here must not override the NODE_ENV this process was actually
// started with — Vite reads process.env.NODE_ENV directly to decide
// dev vs prod (disabling Fast Refresh's preamble in "production"),
// independent of our own isProduction flag above.
const originalNodeEnv = process.env.NODE_ENV
dotenv.config({ path: path.join(__dirname, 'server', '.env') })
if (originalNodeEnv === undefined) delete process.env.NODE_ENV
else process.env.NODE_ENV = originalNodeEnv

log('[boot] isProduction:', isProduction, 'NODE_ENV:', process.env.NODE_ENV, 'PORT:', port)

// Existing Express API code (routes/middleware) is reused as-is, just
// loaded via dynamic import since it's CommonJS and this entry is ESM.
let emailRoutes, newsletterRoutes, errorHandler
try {
  emailRoutes = (await import('./server/routes/emailRoutes.js')).default
  newsletterRoutes = (await import('./server/routes/newsletterRoutes.js')).default
  errorHandler = (await import('./server/middleware/errorHandler.js')).default
  log('[boot] legacy API routes loaded OK')
} catch (err) {
  log('[fatal] failed loading server/routes or server/middleware:', err)
  process.exit(1)
}

async function createServer() {
  const app = express()

  app.use(cors({
    origin: ['https://www.qodexaa.com', 'https://qodexaa.com', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // API routes — mounted before the SSR catch-all so they're never
  // shadowed by the wildcard render handler below.
  app.use('/api', emailRoutes)
  app.use('/api/newsletter', newsletterRoutes)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend running', timestamp: new Date() })
  })

  // Temporary: lets us read the boot log over HTTP when the host's own
  // log viewer / File Manager isn't accessible. Remove once deploy is stable.
  app.get('/__boot-log', (req, res) => {
    try {
      res.type('text/plain').send(fs.readFileSync(bootLogPath, 'utf-8'))
    } catch (err) {
      res.status(404).type('text/plain').send('no boot.log yet: ' + err.message)
    }
  })

  let vite
  let template
  let render

  if (!isProduction) {
    log('[boot] starting Vite dev middleware')
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      root: __dirname,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const clientDistPath = path.join(__dirname, 'dist/client')
    log('[boot] production mode, reading client template from', clientDistPath)
    template = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf-8')
    ;({ render } = await import('./dist/server/entry-server.js'))
    log('[boot] SSR render module loaded OK')
    app.use(express.static(clientDistPath, { index: false }))
  }

  app.use('*', async (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next()
    const url = req.originalUrl

    try {
      let appHtml
      let head = ''
      let html = template

      if (!isProduction) {
        html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        html = await vite.transformIndexHtml(url, html)
        const mod = await vite.ssrLoadModule('/src/entry-server.jsx')
        ;({ html: appHtml, head } = mod.render(url))
      } else {
        ;({ html: appHtml, head } = render(url))
      }

      html = html
        .replace('<!--app-head-->', head)
        .replace('<!--ssr-outlet-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (err) {
      if (vite) vite.ssrFixStacktrace(err)
      next(err)
    }
  })

  app.use(errorHandler)

  return app
}

createServer()
  .then((app) => {
    app.listen(port, '0.0.0.0', () => {
      log(`SSR server running at http://localhost:${port}`)
      log(`Environment: ${isProduction ? 'production' : 'development'}`)
    })
  })
  .catch((err) => {
    log('[fatal] createServer() failed:', err)
    process.exit(1)
  })
