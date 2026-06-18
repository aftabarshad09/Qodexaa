import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
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

// Existing Express API code (routes/middleware) is reused as-is, just
// loaded via dynamic import since it's CommonJS and this entry is ESM.
const emailRoutes = (await import('./server/routes/emailRoutes.js')).default
const newsletterRoutes = (await import('./server/routes/newsletterRoutes.js')).default
const errorHandler = (await import('./server/middleware/errorHandler.js')).default

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
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      root: __dirname,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    const clientDistPath = path.join(__dirname, 'dist/client')
    template = fs.readFileSync(path.join(clientDistPath, 'index.html'), 'utf-8')
    ;({ render } = await import('./dist/server/entry-server.js'))
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

createServer().then((app) => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`SSR server running at http://localhost:${port}`)
    console.log(`Environment: ${isProduction ? 'production' : 'development'}`)
  })
})
