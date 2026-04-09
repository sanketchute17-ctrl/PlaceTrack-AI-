import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] text-zinc-100 p-8">
          <div className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg border border-red-200 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Dashboard Error</h2>
            <p className="text-zinc-400 mb-4">We encountered a problem while rendering this page.</p>
            <pre className="bg-slate-100 p-4 rounded text-xs text-red-500 overflow-auto whitespace-pre-wrap">
              {this.state.error?.message || "Unknown rendering error"}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
