import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, HelpCircle, ArrowLeft, ArrowRight, Grid, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { QuestionItem } from '../../types/tka';
import { MathView } from '../ui/MathView';
import { tapScale } from '../../lib/motion';

interface CbtExamViewProps {
  subjectName: string;
  questions: QuestionItem[];
  onFinishExam: (answers: Record<number, any>, doubtList: number[]) => void;
  onExit: () => void;
}

export const CbtExamView: React.FC<CbtExamViewProps> = ({
  subjectName,
  questions,
  onFinishExam,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [doubtList, setDoubtList] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(75 * 60); // 75 minutes in seconds
  const [showDrawer, setShowDrawer] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  const currentQ = questions[currentIndex];

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      onFinishExam(answers, doubtList);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, answers, doubtList, onFinishExam]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optId,
    }));
  };

  const handleSelectMatrix = (rowId: string, val: string) => {
    const existing = answers[currentQ.id] || {};
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...existing,
        [rowId]: val,
      },
    }));
  };

  const toggleDoubt = () => {
    const qId = currentQ.id;
    if (doubtList.includes(qId)) {
      setDoubtList(prev => prev.filter(id => id !== qId));
    } else {
      setDoubtList(prev => [...prev, qId]);
    }
  };

  const isCurrentDoubt = doubtList.includes(currentQ?.id);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      {/* Sticky Exam Bar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={tapScale}
              onClick={onExit}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
              title="Keluar dari Ujian"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div className="text-left">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider">
                Simulasi CBT Resmi
              </span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {subjectName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-num text-xs sm:text-sm font-bold border transition-colors ${
                timeLeft < 600
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse'
                  : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Question Drawer Trigger */}
            <motion.button
              whileTap={tapScale}
              onClick={() => setShowDrawer(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Grid className="w-4 h-4 text-indigo-500" />
              <span className="hidden sm:inline">Daftar Soal</span>
              <span className="font-num">({answeredCount}/30)</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Question Surface */}
      <main className="max-w-4xl mx-auto w-full p-4 flex-1">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.18 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-5 text-left"
        >
          {/* Question Meta */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-num font-bold text-sm flex items-center justify-center shadow-sm shadow-indigo-500/20">
                {currentQ.id}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {currentQ.topic}
            </span>
          </div>

          {/* Stimulus / Teks Wacana if any */}
          {currentQ.stimulusText && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-950/70 p-4 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Teks Informasi / Stimulus
              </span>
              {currentQ.stimulusImage && (
                <div className="my-2 text-center">
                  <img
                    src={currentQ.stimulusImage}
                    alt="Stimulus"
                    className="max-h-64 mx-auto rounded-lg border border-slate-200 dark:border-slate-800"
                  />
                </div>
              )}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-h-52 overflow-y-auto pr-1">
                <MathView content={currentQ.stimulusText} />
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
            {currentQ.questionImage && (
              <div className="my-3 text-center">
                <img
                  src={currentQ.questionImage}
                  alt="Gambar Soal"
                  className="max-h-56 mx-auto rounded-lg border border-slate-200 dark:border-slate-800"
                />
              </div>
            )}
            <MathView content={currentQ.questionText} />
          </div>

          {/* Regular Multiple Choice Options */}
          {currentQ.options && currentQ.options.length > 0 && (
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    whileTap={tapScale}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-950 dark:text-indigo-100 font-semibold shadow-sm'
                        : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <div className="flex-1 pt-0.5 overflow-x-auto">
                      <MathView content={opt.text} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Matrix / Pernyataan Benar-Salah */}
          {currentQ.matrixRows && currentQ.matrixRows.length > 0 && (
            <div className="space-y-3 pt-2">
              {currentQ.matrixRows.map((row) => {
                const currentVal = (answers[currentQ.id] || {})[row.id];
                return (
                  <div
                    key={row.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 space-y-2"
                  >
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex gap-2">
                      <span className="font-bold text-indigo-500">{row.id}.</span>
                      <MathView content={row.statement} />
                    </div>
                    <div className="flex gap-2 justify-end">
                      {['Benar', 'Salah'].map((choice) => {
                        const isChosen = currentVal === choice;
                        return (
                          <button
                            key={choice}
                            onClick={() => handleSelectMatrix(row.id, choice)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              isChosen
                                ? choice === 'Benar'
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                  : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      {/* Sticky Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Prev Button */}
          <motion.button
            whileTap={tapScale}
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </motion.button>

          {/* Doubt Button */}
          <motion.button
            whileTap={tapScale}
            onClick={toggleDoubt}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isCurrentDoubt
                ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{isCurrentDoubt ? 'Ragu-Ragu (Aktif)' : 'Ragu-Ragu'}</span>
          </motion.button>

          {/* Next / Finish Button */}
          {currentIndex < questions.length - 1 ? (
            <motion.button
              whileTap={tapScale}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20 cursor-pointer"
            >
              <span>Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileTap={tapScale}
              onClick={() => setShowConfirmFinish(true)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              <span>Selesai Tes</span>
              <CheckCircle2 className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Question Number Drawer Modal */}
      <AnimatePresence>
        {showDrawer && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[80vh] flex flex-col text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-indigo-500" />
                  <span>Daftar Nomor Soal (1–30)</span>
                </h3>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500" /> Terjawab
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-amber-500" /> Ragu-ragu
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700" /> Kosong
                </span>
              </div>

              {/* Grid 1-30 */}
              <div className="grid grid-cols-6 sm:grid-cols-6 gap-2.5 overflow-y-auto py-2 flex-1">
                {questions.map((q, idx) => {
                  const isAns = answers[q.id] !== undefined;
                  const isDoubt = doubtList.includes(q.id);
                  const isCurrent = currentIndex === idx;

                  let colorClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                  if (isDoubt) {
                    colorClass = 'bg-amber-500 text-slate-950 font-bold border-amber-600';
                  } else if (isAns) {
                    colorClass = 'bg-emerald-600 text-white font-bold border-emerald-700';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowDrawer(false);
                      }}
                      className={`h-11 rounded-xl flex items-center justify-center font-num text-sm border font-semibold transition-all cursor-pointer ${colorClass} ${
                        isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : ''
                      }`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Trigger to Submit */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setShowDrawer(false);
                    setShowConfirmFinish(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Selesaikan Ujian Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal to Finish */}
      <AnimatePresence>
        {showConfirmFinish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Kumpulkan Lembar Jawaban?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Kamu telah menjawab <strong className="text-indigo-500 font-num">{answeredCount} dari 30 soal</strong>.
                {doubtList.length > 0 && (
                  <span className="text-amber-500 block mt-1">
                    ⚠️ Masih ada {doubtList.length} nomor bertanda ragu-ragu.
                  </span>
                )}
              </p>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowConfirmFinish(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cek Lagi
                </button>
                <button
                  onClick={() => {
                    setShowConfirmFinish(false);
                    onFinishExam(answers, doubtList);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm shadow-emerald-500/20 transition-colors"
                >
                  Ya, Selesai
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
