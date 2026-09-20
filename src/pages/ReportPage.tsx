import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Bookmark, BookOpen, Calculator, RotateCcw, Sparkles, TrendingUp } from 'lucide-react';
import { storage } from '../lib/storage';
import { tapScale } from '../lib/motion';

interface ReportPageProps {
  mathStudiedCount: number;
  indoStudiedCount: number;
  bookmarks: string[];
  onOpenStudy: (subject: 'matematika' | 'bahasa_indonesia') => void;
  onDataReset: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  mathStudiedCount,
  indoStudiedCount,
  bookmarks,
  onOpenStudy,
  onDataReset,
}) => {
  const history = storage.getExamHistory();
  const mathPercent = Math.round((mathStudiedCount / 30) * 100);
  const indoPercent = Math.round((indoStudiedCount / 30) * 100);
  const totalStudied = mathStudiedCount + indoStudiedCount;
  const overallPercent = Math.round((totalStudied / 60) * 100);

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Overview Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-emerald-600 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold">
          <Award className="w-4 h-4 text-amber-300" />
          <span>Rapor Kumulatif Siswa</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Peta Kesiapan TKA Nasional</h2>
        <div className="flex items-end gap-2 pt-2">
          <span className="text-5xl font-num font-extrabold leading-none">{overallPercent}%</span>
          <span className="text-xs text-indigo-200 mb-1">Total Materi Terkuasai ({totalStudied}/60 Soal)</span>
        </div>
      </div>

      {/* Subject Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Math Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Matematika</h3>
            </div>
            <span className="font-num text-sm font-extrabold text-emerald-500">{mathPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${mathPercent}%` }} />
          </div>
          <p className="text-xs text-slate-500">
            {mathStudiedCount} dari 30 butir soal telah dipelajari dengan pemahaman konsep.
          </p>
          <button
            onClick={() => onOpenStudy('matematika')}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer"
          >
            Lanjut Pelajari Matematika
          </button>
        </div>

        {/* Indo Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bahasa Indonesia</h3>
            </div>
            <span className="font-num text-sm font-extrabold text-amber-500">{indoPercent}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${indoPercent}%` }} />
          </div>
          <p className="text-xs text-slate-500">
            {indoStudiedCount} dari 30 butir soal telah dipelajari dengan pemahaman konsep.
          </p>
          <button
            onClick={() => onOpenStudy('bahasa_indonesia')}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer"
          >
            Lanjut Pelajari B. Indonesia
          </button>
        </div>
      </div>

      {/* Bookmarked Questions Quick Jumper */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-500" />
          <span>Soal yang Ditandai untuk Diulang ({bookmarks.length})</span>
        </h3>
        {bookmarks.length === 0 ? (
          <p className="text-xs text-slate-400">
            Belum ada soal yang ditandai. Klik ikon bookmark pada soal yang kamu anggap sulit saat belajar.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {bookmarks.map((bm) => {
              const [subj, qId] = bm.split('-');
              return (
                <button
                  key={bm}
                  onClick={() => onOpenStudy(subj as any)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-colors cursor-pointer"
                >
                  {subj === 'matematika' ? '🔢 Matik' : '📖 Indo'} No. {qId}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Exam Day Strategy Tips */}
      <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/30 space-y-2">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" /> Tips Menghadapi Ujian TKA CBT:
        </span>
        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
          <li>Alokasikan rata-rata 2,5 menit per butir soal (total 75 menit untuk 30 nomor).</li>
          <li>Gunakan tombol <strong>Ragu-ragu</strong> jika menemukan soal cerita yang panjang agar tidak macet di satu nomor.</li>
          <li>Pada soal Bahasa Indonesia, baca pertanyaan terlebih dahulu sebelum membaca teks panjang agar langsung menemukan kata kuncinya.</li>
        </ul>
      </div>
    </div>
  );
};
