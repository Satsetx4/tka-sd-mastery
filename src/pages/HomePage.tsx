import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, BookOpen, Clock, Sparkles, CheckCircle2, ChevronRight, BookmarkCheck, ArrowUpRight } from 'lucide-react';
import { tapScale, hoverElevate } from '../lib/motion';
import { SubjectType } from '../types/tka';

interface HomePageProps {
  onOpenStudy: (subject: SubjectType) => void;
  onOpenExam: (subject: SubjectType) => void;
  mathStudiedCount: number;
  indoStudiedCount: number;
  bookmarkCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenStudy,
  onOpenExam,
  mathStudiedCount,
  indoStudiedCount,
  bookmarkCount,
}) => {
  const mathProgressPercent = Math.round((mathStudiedCount / 30) * 100);
  const indoProgressPercent = Math.round((indoStudiedCount / 30) * 100);

  return (
    <div className="space-y-6 text-left pb-12">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-indigo-900/40 relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Bank Soal Asli Pusmendik Kemendikdasmen</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
            Persiapan Juara <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-amber-200 to-emerald-300">
              TKA SD Kelas 6
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
            Satu-satunya web belajar yang menyediakan <strong>kunci jawaban resmi</strong> beserta <strong>langkah hitungan KaTeX & bukti wacana lengkap</strong> yang tidak tersedia di web pemerintah.
          </p>
        </div>
      </motion.div>

      {/* Progress Sparkbars Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Progres Penguasaan Materi
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" /> {bookmarkCount} Soal Ditandai
          </span>
        </div>

        {/* Math Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Matematika
            </span>
            <span className="font-num text-slate-500 dark:text-slate-400">
              {mathStudiedCount}/30 ({mathProgressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mathProgressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </div>

        {/* Indo Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Bahasa Indonesia
            </span>
            <span className="font-num text-slate-500 dark:text-slate-400">
              {indoStudiedCount}/30 ({indoProgressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${indoProgressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Main Two Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CARD 1: MATEMATIKA */}
        <motion.div
          whileHover={hoverElevate}
          className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-sm">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-num">
                30 Butir Soal
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Matematika (Numerasi)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Operasi hitung campuran, pecahan & desimal, geometri bangun ruang, satuan berat & waktu, serta diagram statistik.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <motion.button
              whileTap={tapScale}
              onClick={() => onOpenStudy('matematika')}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <span>Pelajari Soal & Pembahasan</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={tapScale}
              onClick={() => onOpenExam('matematika')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Simulasi CBT (75 Menit)</span>
            </motion.button>
          </div>
        </motion.div>

        {/* CARD 2: BAHASA INDONESIA */}
        <motion.div
          whileHover={hoverElevate}
          className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-num">
                30 Butir Soal
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Bahasa Indonesia (Literasi)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Teks informasi sains & kesehatan, dongeng fabel, alur cerita budi pekerti, teks prosedur, puisi sahabat, dan ragam kuliner.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <motion.button
              whileTap={tapScale}
              onClick={() => onOpenStudy('bahasa_indonesia')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Pelajari Soal & Pembahasan</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={tapScale}
              onClick={() => onOpenExam('bahasa_indonesia')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Simulasi CBT (75 Menit)</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Trust & Methodology Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Kunci Resmi</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Kunci jawaban diekstrak langsung dari modul verifikasi Pusmendik 2026.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
          <Calculator className="w-5 h-5 text-emerald-500" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">KaTeX Math Presisi</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Rumus pecahan bertingkat dirender tajam dan jelas di semua layar HP.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1">
          <Clock className="w-5 h-5 text-amber-500" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Mode CBT Nyata</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Latihan berwaktu 75 menit dengan sistem drawer nomor 1–30 persis aslinya.
          </p>
        </div>
      </div>
    </div>
  );
};
