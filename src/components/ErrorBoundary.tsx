import React, { Component, type ReactNode } from 'react';
import { CannabisLeafIcon } from './CannabisLeafIcon';

interface Props {
  children: ReactNode;
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#3a0f14] text-[#faf5eb] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/40 mb-4 animate-bounce">
            <CannabisLeafIcon className="w-12 h-12 text-[#16a34a]" />
          </div>
          <h1 className="font-serif-vintage text-2xl font-bold uppercase mb-2">
            Trintou do Igor • 4:20
          </h1>
          <p className="text-sm font-serif-vintage text-[#e6d5c1] max-w-sm mb-6">
            Ocorreu uma pequena instabilidade ao carregar a página no seu navegador.
          </p>
          <button
            onClick={this.handleReload}
            className="py-3 px-6 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-[#faf5eb] font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
