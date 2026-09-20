import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { storage } from '../../lib/storage';
import { tapScale } from '../../lib/motion';

interface FooterProps {
  onDataReset?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDataReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    storage.resetAllData();
    setShowConfirm(false);
    if (onDataReset) onDataReset();
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 py-8 px-4 mt-12 mb-20 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>TKA SD Kelas 6 — Kurikulum Nasional Kemendikdasmen</span>
        </div>

        <p className="leading-relaxed text-[11px] text-slate-400 dark:text-slate-500">
          Soal dan kunci jawaban bersumber dari aplikasi resmi Pusmendik. Pembahasan langkah demi langkah disusun untuk membantu siswa dan orang tua memahami materi secara mendalam.
        </p>

        <div className="pt-2">
          <motion.button
            whileTap={tapScale}
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progres Belajar / Mulai dari Awal</span>
          </motion.button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Mulai Ulang dari Awal?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Tindakan ini akan mengosongkan seluruh riwayat skor simulasi, penanda soal yang sudah dipelajari, dan bookmark soal Anda.
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
