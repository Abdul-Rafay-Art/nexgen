import { Component } from 'react';

/** Catches render-time failures and keeps the rest of the page recoverable. */
export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Keep diagnostics available to the browser console without exposing internals in the UI.
    console.error('Application render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className="section-pad">
          <div className="container">
            <h1>Something went wrong.</h1>
            <p>Please refresh the page to try again.</p>
            {import.meta.env.DEV && this.state.error && <pre>{this.state.error.message}</pre>}
            <button className="button button-dark" type="button" onClick={() => window.location.reload()}>
              Refresh page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
