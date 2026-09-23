import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return <main className="min-h-screen grid place-items-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="max-w-md rounded-2xl border p-6 space-y-4 text-center">
        <h1 className="text-xl font-bold">Halaman mengalami kendala</h1>
        <p>Progres latihan yang tersimpan di perangkat tetap tersedia. Muat ulang halaman untuk melanjutkan.</p>
        <button onClick={() => window.location.reload()} className="min-h-11 px-5 rounded-xl bg-indigo-600 text-white">Muat ulang</button>
      </div>
    </main>;
  }
}
