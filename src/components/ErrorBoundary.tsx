import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
              Something went wrong
            </h1>
            <p className="text-[16px] text-[#4A5553] mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              size="lg"
            >
              Refresh page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
