import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})

window.onerror = (msg, _source, _line, _col, error) => {
  if (
    error?.message?.includes('Failed to fetch dynamically imported module') ||
    error?.message?.includes('Importing a module script failed') ||
    error?.message?.includes('ChunkLoadError') ||
    error?.message?.includes('Loading chunk') ||
    error?.message?.includes('dynamically imported')
  ) {
    window.location.reload()
    return true
  }
  return false
}

window.addEventListener('unhandledrejection', (event) => {
  const msg = event.reason?.message || String(event.reason)
  if (
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Importing a module script failed') ||
    msg.includes('ChunkLoadError') ||
    msg.includes('Loading chunk') ||
    msg.includes('dynamically imported')
  ) {
    event.preventDefault()
    window.location.reload()
  }
})

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
