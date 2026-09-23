import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { storage } from '../../lib/storage';
import { tapScale } from '../../lib/motion';

export const Footer: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showConfirm) return;
    const previous = document.activeElement as HTMLElement | null;
    const buttons = () => [...(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])];
    buttons()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowConfirm(false);
      if (event.key !== 'Tab') return;
      const items = buttons(); const first = items[0]; const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus(); };
  }, [showConfirm]);

  const handleReset = () => {
    storage.resetAllData();
    setShowConfirm(false);
    window.location.replace('/');
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 py-8 px-4 mt-12 mb-20 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>TKA SD Mastery — latihan mandiri</span>
        </div>

        <p className="leading-relaxed text-[11px] text-slate-400 dark:text-slate-500">
          Materi latihan merujuk contoh soal dan kerangka asesmen TKA SD/MI. Aplikasi ini tidak berafiliasi dengan Pusmendik; kunci dan pembahasan di sini adalah materi belajar yang perlu ditinjau secara mandiri.
        </p>
        <a href="https://pusmendik.kemendikdasmen.go.id/tka/tka/view/mata-pelajaran-wajib/sd" target="_blank" rel="noreferrer" className="underline text-indigo-600 dark:text-indigo-400">Lihat contoh soal di situs Pusmendik</a>

        <div className="pt-2">
          <motion.button
            whileTap={tapScale}
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semua Data / Mulai dari Awal</span>
          </motion.button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              ref={dialogRef}
              role="dialog" aria-modal="true" aria-labelledby="reset-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 id="reset-title" className="text-base font-bold text-slate-900 dark:text-white">
                Mulai Ulang dari Awal?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Tindakan ini menghapus profil, sesi CBT aktif, riwayat nilai latihan, penanda soal yang sudah dipelajari, dan bookmark di perangkat ini.
              </p>
              <div className="flex gap-2 mt-6">
                <motion.button
                  whileTap={tapScale}
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileTap={tapScale}
                  onClick={handleReset}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm shadow-rose-500/20 transition-colors"
                >
                  Ya, Reset Semua
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
