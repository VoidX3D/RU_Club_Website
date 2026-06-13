import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  isChunkError: boolean
}

function isChunkLoadError(error: Error): boolean {
  const msg = error.message || ''
  return (
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Importing a module script failed') ||
    msg.includes('ChunkLoadError') ||
    msg.includes('Loading chunk') ||
    msg.includes('dynamically imported') ||
    msg.includes('error loading dynamically')
  )
}

function clearAppCache() {
  if ('caches' in window) {
    caches.keys().then(names => names.forEach(name => caches.delete(name)))
  }
  Object.keys(localStorage).forEach(key => {
    if (key !== 'theme' && key !== 'cookie-consent') {
      localStorage.removeItem(key)
    }
  })
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, isChunkError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, isChunkError: isChunkLoadError(error) }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-red-500">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2 className="text-xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-2">
              {this.state.isChunkError ? 'New version deployed' : 'Something went wrong'}
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-2">
              {this.state.isChunkError
                ? 'The app was updated. Please refresh to get the latest version.'
                : this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <p className="text-xs text-text-muted dark:text-dark-text-muted mb-6">
              {this.state.isChunkError ? 'Your cache has stale references to old files.' : 'This might be a temporary issue. Try reloading.'}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl bg-brand-700 text-white font-medium hover:bg-brand-800 transition-all"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null, isChunkError: false })}
                className="px-6 py-3 rounded-xl border border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary font-medium hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-all"
              >
                Try Again
              </button>
              <button
                onClick={() => { clearAppCache(); window.location.reload() }}
                className="px-6 py-3 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
              >
                Clear Cache & Reload
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
