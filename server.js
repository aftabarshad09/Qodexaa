// Only Node built-ins are statically imported here — they can't fail to
// resolve. Everything else (express/cors/dotenv, the legacy API routes,
// vite) is loaded dynamically inside main() below. This file must have
// NO top-level await: the host runs it through LiteSpeed's lsnode.js,
// which loads entry files via require(), and require() cannot load an
// ESM graph containing top-level await (ERR_REQUIRE_ASYNC_MODULE) — it
// crashes before a single line of our code, including logging, runs.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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

process.on('uncaughtException', (err) => {
  log('[fatal] uncaughtException:', err?.stack || String(err))
  process.exit(1)
})
process.on('unhandledRejection', (reason) => {
  log('[fatal] unhandledRejection:', reason?.stack || String(reason))
  process.exit(1)
})

async function main() {
  log('[boot] server.js starting, node', process.version, 'cwd', process.cwd())

  const { default: express } = await import('express')
  const { default: cors } = await import('cors')
  const { default: dotenv } = await import('dotenv')
  log('[boot] core deps (express/cors/dotenv) loaded OK')

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
  const emailRoutes = (await import('./server/routes/emailRoutes.js')).default
  const newsletterRoutes = (await import('./server/routes/newsletterRoutes.js')).default
  const chatRoutes = (await import('./server/routes/chatRoutes.js')).default
  const errorHandler = (await import('./server/middleware/errorHandler.js')).default
  log('[boot] legacy API routes loaded OK')

  const app = express()

  // qodexaa.com (non-www) is canonical — collapse the www host into it
  // before anything else runs, so search engines never see both as
  // separate, fully-duplicated copies of every page. Targets https
  // unconditionally since the canonical link tags below are https-only.
  // `trust proxy` makes req.secure/req.protocol reflect the original
  // client scheme when the host's reverse proxy terminates TLS and
  // forwards plain HTTP internally (the common case on shared hosting).
  app.set('trust proxy', true)
  app.use((req, res, next) => {
    const host = req.headers.host || ''
    if (host.startsWith('www.')) {
      return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`)
    }
    next()
  })

  // /projects was a content-identical alias of "/" (same HomePage component)
  // — a duplicate-content pair, not a distinct page. Collapse it server-side
  // rather than giving it its own title, since giving two URLs for the same
  // content unique titles doesn't fix the duplication, it just hides it.
  app.get('/projects', (req, res) => res.redirect(301, '/'))

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
  app.use('/api/chat', chatRoutes)
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

  // Matches a trailing file extension (e.g. .jpg, .css, .woff2) so static
  // asset requests can be told apart from page routes, which never have one.
  const STATIC_FILE_EXTENSION = /\.[a-zA-Z0-9]+$/

  app.use('*', async (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next()
    const url = req.originalUrl

    // express.static above already serves any asset that actually exists
    // and calls next() otherwise — reaching this point means it didn't find
    // the file. Without this guard, a missing asset request (wrong image
    // path, stale CSS/JS reference, etc.) would fall through to the SSR
    // renderer below, which renders the React app for literally any URL and
    // returns 200 text/html — masking a missing file as a successful page
    // load instead of a real 404.
    if (STATIC_FILE_EXTENSION.test(url.split('?')[0])) {
      return res.status(404).type('text/plain').send('Not found')
    }

    try {
      let appHtml
      let head = ''
      let html = template
      let status = 200

      if (!isProduction) {
        html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        html = await vite.transformIndexHtml(url, html)
        const mod = await vite.ssrLoadModule('/src/entry-server.jsx')
        ;({ html: appHtml, head, status } = mod.render(url))
      } else {
        ;({ html: appHtml, head, status } = render(url))
      }

      html = html
        .replace('<!--app-head-->', head)
        .replace('<!--ssr-outlet-->', appHtml)

      res.status(status || 200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (err) {
      if (vite) vite.ssrFixStacktrace(err)
      next(err)
    }
  })

  app.use(errorHandler)

  app.listen(port, '0.0.0.0', () => {
    log(`SSR server running at http://localhost:${port}`)
    log(`Environment: ${isProduction ? 'production' : 'development'}`)
  })
}

main().catch((err) => {
  log('[fatal] main() failed:', err?.stack || String(err))
  process.exit(1)
})
