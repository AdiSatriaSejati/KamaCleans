import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Kirim error ke service monitoring jika ada
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Oops, terjadi kesalahan!</h2>
          <p>Mohon refresh halaman atau coba lagi nanti.</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 