import React from 'react';
import { motion } from 'framer-motion';
import { Award, RotateCcw, Home, Eye, Printer, School, User, Calendar } from 'lucide-react';
import type { ExamAnswers, ExamResult, QuestionItem, StudentProfile } from '../../types/tka';
import { tapScale } from '../../lib/motion';
import { isComplete, isCorrect, scoreExam } from '../../lib/exam';

interface ScoreReportProps {
  subjectName: string;
  questions: QuestionItem[];
  userAnswers: ExamAnswers;
  result: ExamResult | null;
  studentProfile: StudentProfile | null;
  onRetry: () => void;
  onGoHome: () => void;
  onReviewQuestion: (qId: number) => void;
}

export const ScoreReportModal: React.FC<ScoreReportProps> = ({
  subjectName,
  questions,
  userAnswers,
  result,
  studentProfile,
  onRetry,
  onGoHome,
  onReviewQuestion,
}) => {
  const { correct: correctCount, wrong: wrongCount, empty: emptyCount, score: finalScore } = scoreExam(questions, userAnswers);
  const results = questions.map(question => ({ question, correct: isCorrect(question, userAnswers[question.id]), complete: isComplete(question, userAnswers[question.id]) }));
  const dateStr = result ? new Date(result.finishedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) : '';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 text-slate-800 dark:text-slate-100 text-left">
      {/* Printable Certificate / Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-emerald-600 text-white p-6 sm:p-8 text-center shadow-xl shadow-indigo-500/20 relative overflow-hidden print:bg-none print:text-black print:p-0 print:shadow-none"
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl print:hidden" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-white/15 backdrop-blur-md print:hidden">
            <Award className="w-8 h-8 text-amber-300" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-200 block">
              Hasil Latihan TKA SD
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold">{subjectName}</h2>
          </div>

          {/* Student Identity Box */}
          {studentProfile && (studentProfile.name || studentProfile.school) && (
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 max-w-md mx-auto text-left border border-white/20 space-y-1.5 text-xs sm:text-sm">
              {studentProfile.name && <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-bold text-white text-sm sm:text-base">
                  {studentProfile.name}
                </span>
              </div>}
              <div className="flex items-center justify-between text-indigo-100 text-xs flex-wrap gap-1">
                {studentProfile.school && <span className="flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>{studentProfile.school}</span>
                </span>}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-indigo-200 pt-1 border-t border-white/10">
                <Calendar className="w-3 h-3" />
                <span>Tanggal Ujian: {dateStr}</span>
              </div>
            </div>
          )}

          {/* Big Score */}
          <div className="py-2">
            <span className="text-6xl sm:text-7xl font-num font-extrabold tracking-tight">
              {finalScore}
            </span>
            <span className="text-lg text-indigo-200 font-semibold">/100</span>
          </div>

          <p className="text-xs sm:text-sm text-indigo-100 max-w-sm mx-auto">
            Skor ini hanya hasil latihan pada kumpulan soal ini, bukan nilai atau prediksi hasil TKA. Tinjau soal yang belum tepat untuk melanjutkan belajar.
          </p>
        </div>
      </motion.div>

      {/* Stats Breakdown Grid */}
      <div className="grid grid-cols-3 gap-3 print:border print:border-slate-300">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
            BENAR
          </span>
          <span className="text-2xl sm:text-3xl font-num font-extrabold text-emerald-600 dark:text-emerald-400">
            {correctCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block">
            SALAH
          </span>
          <span className="text-2xl sm:text-3xl font-num font-extrabold text-rose-600 dark:text-rose-400">
            {wrongCount}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-500/10 border border-slate-500/20 text-center">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
            KOSONG
          </span>
          <span className="text-2xl sm:text-3xl font-num font-extrabold text-slate-600 dark:text-slate-300">
            {emptyCount}
          </span>
        </div>
      </div>

      {/* Action Buttons (Hidden on Print) */}
      <div className="flex gap-2.5 print:hidden flex-wrap sm:flex-nowrap">
        <motion.button
          whileTap={tapScale}
          onClick={handlePrint}
          className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </motion.button>
        <motion.button
          whileTap={tapScale}
          onClick={onRetry}
          className="flex-1 min-w-[120px] py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-indigo-500" />
          <span>Ulangi Tes</span>
        </motion.button>
        <motion.button
          whileTap={tapScale}
          onClick={onGoHome}
          className="flex-1 min-w-[120px] py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/20 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Beranda</span>
        </motion.button>
      </div>

      {/* Item-by-Item Review List */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span>Evaluasi Per Butir Soal:</span>
          <span className="text-xs font-normal text-slate-500 print:hidden">Klik untuk melihat pembahasan</span>
        </h3>

        <div className="space-y-2">
          {results.map(({ question: q, correct, complete }) => (
            <div
              key={q.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                correct
                  ? 'bg-white dark:bg-slate-900/60 border-emerald-500/20'
                  : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-num text-xs font-bold shrink-0 ${
                    correct
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {q.id}
                </span>
                <div className="truncate">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                    {q.topic}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {complete ? (correct ? 'Benar' : 'Perlu ditinjau') : 'Belum dijawab'} · Kunci: <strong className="text-slate-700 dark:text-slate-300">{q.answerKey}</strong>
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={tapScale}
                onClick={() => onReviewQuestion(q.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center gap-1 shrink-0 cursor-pointer print:hidden"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Pelajari</span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
