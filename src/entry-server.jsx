import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

const HEAD_CAPTURE_ID = '__ssr_head_capture'
const headCaptureRegex = new RegExp(`<head id="${HEAD_CAPTURE_ID}">([\\s\\S]*?)</head>`)

// React 19 hoists <title>/<meta>/<link>/<base> tags rendered anywhere in the
// tree into the nearest <head> element present in the same renderToString
// call, so this empty <head> sibling is purely a capture target — it's
// stripped back out below, leaving the real index.html <head> untouched.
export function render(url) {
  const rendered = renderToString(
    <StrictMode>
      <HelmetProvider>
        <head id={HEAD_CAPTURE_ID}></head>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  )

  const match = rendered.match(headCaptureRegex)
  const head = match ? match[1] : ''
  const html = rendered.replace(headCaptureRegex, '')

  return { html, head }
}
