import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // In a production app, log this to an error reporting service like Sentry
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-center">
          <div className="glass-panel max-w-md p-8" role="alert">
            <h1 className="mb-4 font-[var(--font-heading)] text-2xl font-bold text-[var(--text)]">
              Something went wrong
            </h1>
            <p className="mb-6 text-sm text-[var(--text-soft)]">
              We encountered an unexpected error while loading this page.
            </p>
            <button
              type="button"
              className="action-button"
              onClick={() => window.location.reload()}
              style={{ padding: '10px 24px' }}
            >
              Refresh the page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
