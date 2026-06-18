import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

console.log('[boot] server.js starting, node', process.version, 'cwd', process.cwd())

process.on('uncaughtException', (err) => {
  console.error('[fatal] uncaughtException:', err)
  process.exit(1)
})
process.on('unhandledRejection', (reason) => {
  console.error('[fatal] unhandledRejection:', reason)
  process.exit(1)
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
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

console.log('[boot] isProduction:', isProduction, 'NODE_ENV:', process.env.NODE_ENV, 'PORT:', port)

// Existing Express API code (routes/middleware) is reused as-is, just
// loaded via dynamic import since it's CommonJS and this entry is ESM.
let emailRoutes, newsletterRoutes, errorHandler
try {
  emailRoutes = (await import('./server/routes/emailRoutes.js')).default
  newsletterRoutes = (await import('./server/routes/newsletterRoutes.js')).default
  errorHandler = (await import('./server/middleware/errorHandler.js')).default
  console.log('[boot] legacy API routes loaded OK')
} catch (err) {
  console.error('[fatal] failed loading server/routes or server/middleware:', err)
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

  let vite
  let template
  let render

  if (!isProduction) {
    console.log('[boot] starting Vite dev middleware')
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      root: __dirname,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const clientDistPath = path.join(__dirname, 'dist/client')
    console.log('[boot] production mode, reading client template from', clientDistPath)
    template = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf-8')
    ;({ render } = await import('./dist/server/entry-server.js'))
    console.log('[boot] SSR render module loaded OK')
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
      console.log(`SSR server running at http://localhost:${port}`)
      console.log(`Environment: ${isProduction ? 'production' : 'development'}`)
    })
  })
  .catch((err) => {
    console.error('[fatal] createServer() failed:', err)
    process.exit(1)
  })
