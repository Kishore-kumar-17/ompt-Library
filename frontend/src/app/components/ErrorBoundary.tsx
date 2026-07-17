import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  // Called when a render error is caught — used to reset app-level state
  // (e.g. route back to "home") so recovery doesn't just re-render the same crash.
  onRecover?: () => void;
}

interface State {
  error: Error | null;
}

// The only error boundary in the app. Without this, any uncaught render
// error anywhere in the tree — including a malformed route string reaching
// decodeURIComponent — took down the entire SPA to a blank white screen with
// no recovery short of a hard reload.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
    this.props.onRecover?.();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-[#0a0a0a] mb-3" style={{ fontSize: 28, fontWeight: 700 }}>
            Something went wrong
          </h1>
          <p className="text-[#6b7280] mb-6" style={{ fontSize: 14, lineHeight: 1.6 }}>
            This page hit an unexpected error. You can go back to the home page, or reload if the problem continues.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] font-bold hover:bg-[#4FC3F7]/90 transition-colors"
            >
              Back to home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="h-10 px-5 rounded-full border border-[#0a0a0a]/15 text-[#0a0a0a] font-semibold hover:bg-[#0a0a0a]/5 transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
