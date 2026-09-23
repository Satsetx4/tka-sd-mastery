import { useEffect } from 'react';

export function NotFound() {
  useEffect(() => {
    document.title = 'Halaman tidak ditemukan — TKA SD Mastery';
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) robots.content = 'noindex, follow';
  }, []);
  return <main className="min-h-screen grid place-items-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
    <div className="max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 p-7 text-center space-y-4">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Halaman tidak ditemukan</h2>
      <p>Alamat ini belum tersedia. Kembali ke beranda untuk memilih materi atau melanjutkan latihan.</p>
      <a href="/" className="inline-grid min-h-11 place-items-center px-5 rounded-xl bg-indigo-600 text-white font-semibold">Kembali ke Beranda</a>
    </div>
  </main>;
}
