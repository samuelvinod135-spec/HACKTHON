import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI Exception caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#edf2f8] flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-3xl bg-white p-8 shadow-xl border border-sky-100 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 border border-amber-200">
              <AlertCircle size={32} />
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-2">
              Something went slightly sideways!
            </h2>
            <p className="text-xs text-slate-600 mb-6 font-medium leading-relaxed">
              LabXplore encountered an unexpected state. Don't worry, your laboratory progress and notes are preserved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 text-xs font-bold shadow-md shadow-sky-500/20 transition active:scale-95 cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>Reload Lab</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
              >
                <Home size={15} />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
