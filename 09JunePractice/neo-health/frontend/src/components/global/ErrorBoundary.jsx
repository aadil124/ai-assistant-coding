import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or error-reporting service
    console.error('ErrorBoundary caught an unhandled rendering crash:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
          <div className="row justify-content-center w-100">
            <div className="col-12 col-md-8 col-lg-6 text-center">
              <div className="neo-glass-card p-5 border bg-white shadow-lg">
                <div 
                  className="rounded-circle bg-danger bg-opacity-10 text-danger mx-auto mb-4 d-flex align-items-center justify-content-center border border-danger border-opacity-10"
                  style={{ width: '80px', height: '80px' }}
                >
                  <i className="bi bi-bug-fill fs-1"></i>
                </div>
                <h3 className="fw-bold text-dark mb-2">Something Went Wrong</h3>
                <p className="text-secondary small mb-4">
                  An unexpected error crashed this component render. We have flagged this event for our technical staff.
                </p>

                {/* Error message text */}
                {this.state.error && (
                  <div className="alert alert-danger text-start p-3 mb-4 rounded-3 text-break small">
                    <strong className="d-block mb-1">Fatal Error Message:</strong>
                    <code>{this.state.error.toString()}</code>
                  </div>
                )}

                <div className="d-flex justify-content-center gap-3">
                  <button 
                    type="button" 
                    className="btn btn-primary-neo py-2.5 px-4 rounded-3 fw-semibold"
                    onClick={this.handleReload}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i> Reload Application
                  </button>
                  <a href="/" className="btn btn-outline-secondary py-2.5 px-4 rounded-3 fw-semibold text-secondary">
                    Back to Home
                  </a>
                </div>

                {/* Debug details dropdown */}
                {this.state.errorInfo && (
                  <div className="mt-4 text-start border-top pt-3">
                    <details className="text-secondary small">
                      <summary className="cursor-pointer fw-semibold small text-uppercase">Diagnostic details</summary>
                      <pre className="mt-2 bg-light p-3 rounded border text-secondary fw-mono overflow-auto" style={{ fontSize: '10px', maxHeight: '180px' }}>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
