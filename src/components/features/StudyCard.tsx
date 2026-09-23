import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ChevronDown, ChevronUp, CheckCircle, FileText } from 'lucide-react';
import { QuestionItem } from '../../types/tka';
import { MathView } from '../ui/MathView';
import { ExplanationBox } from './ExplanationBox';
import { tapScale } from '../../lib/motion';
import { matrixChoices } from '../../lib/exam';

interface StudyCardProps {
  item: QuestionItem;
  isBookmarked: boolean;
  isStudied: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleStudied: (id: string) => void;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  item,
  isBookmarked,
  isStudied,
  onToggleBookmark,
  onToggleStudied,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [matrixAnswers, setMatrixAnswers] = useState<Record<string, string>>({});

  const bookmarkKey = `${item.subject}-${item.id}`;

  const handleSelectOption = (optId: string) => {
    setSelectedOptions(prev => item.type === 'pg_kompleks'
      ? prev.includes(optId) ? prev.filter(id => id !== optId) : [...prev, optId]
      : [optId]);
  };

  const handleSelectMatrix = (rowId: string, val: string) => {
    setMatrixAnswers(prev => ({ ...prev, [rowId]: val }));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isStudied
          ? 'bg-white/90 dark:bg-slate-900/80 border-emerald-500/30 shadow-sm'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Top Header Card */}
      <div className="px-4 sm:px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/90 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-num font-bold text-xs flex items-center justify-center border border-indigo-500/20">
            {item.id}
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {item.topic}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            whileTap={tapScale}
            onClick={() => onToggleBookmark(bookmarkKey)}
            title="Tandai Bookmark Soal"
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            whileTap={tapScale}
            onClick={() => onToggleStudied(bookmarkKey)}
            title="Tandai Sudah Dipelajari"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isStudied
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isStudied ? 'text-emerald-500' : ''}`} />
            <span className="hidden sm:inline">{isStudied ? 'Sudah Dipelajari' : 'Tandai Dipelajari'}</span>
          </motion.button>
        </div>
      </div>

      {/* Main Body Card */}
      <div className="p-4 sm:p-5 space-y-4 text-left">
        {/* Stimulus / Wacana Bacaan */}
        {item.stimulusText && (
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Wacana / Informasi Stimulus</span>
            </div>
            {item.stimulusImage && (
              <div className="my-2 text-center">
                <img
                  src={item.stimulusImage}
                  alt={`Stimulus Soal ${item.id}`}
                  className="max-h-60 mx-auto rounded-lg border border-slate-200 dark:border-slate-800"
                  loading="lazy"
                />
              </div>
            )}
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-h-56 overflow-y-auto pr-1">
              <MathView content={item.stimulusText} />
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
          {item.questionImage && (
            <div className="my-3 text-center">
              <img
                src={item.questionImage}
                alt={`Gambar Soal ${item.id}`}
                className="max-h-52 mx-auto rounded-lg border border-slate-200 dark:border-slate-800"
                loading="lazy"
              />
            </div>
          )}
          <MathView content={item.questionText} />
        </div>

        {/* Interactive Options: Regular Multiple Choice */}
        {item.options && item.options.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block">
              Pilihan Jawaban (Uji mandiri sebelum buka kunci):
            </span>
            <div className="grid grid-cols-1 gap-2">
              {item.options.map((opt) => {
                const isSelected = selectedOptions.includes(opt.id);
                return (
                  <motion.button
                    key={opt.id}
                    whileTap={tapScale}
                    onClick={() => handleSelectOption(opt.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-3 rounded-xl border text-sm sm:text-base flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500/80 text-indigo-950 dark:text-indigo-200 font-medium shadow-sm'
                        : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
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
          </div>
        )}

        {/* Interactive Matrix / Benar-Salah Table */}
        {item.matrixRows && item.matrixRows.length > 0 && (
          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block">
              Tabel Evaluasi Pernyataan:
            </span>
            <div className="space-y-2">
              {item.matrixRows.map((row) => (
                <div
                  key={row.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
                >
                  <div className="flex items-start gap-2 text-sm sm:text-base text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-indigo-500">{row.id}.</span>
                    <MathView content={row.statement} />
                  </div>
                  <div className="flex gap-2 justify-end">
                    {matrixChoices(item).map((val) => {
                      const isChosen = matrixAnswers[row.id] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleSelectMatrix(row.id, val)}
                          aria-pressed={isChosen}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            isChosen
                              ? val === 'Benar'
                                ? 'bg-emerald-500 text-white border-emerald-600'
                                : 'bg-rose-500 text-white border-rose-600'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Explanation Button */}
        <div className="pt-2">
          <motion.button
            whileTap={tapScale}
            onClick={() => setShowExplanation(!showExplanation)}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              showExplanation
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-transparent shadow-sm shadow-indigo-500/25'
            }`}
          >
            <span>{showExplanation ? 'Tutup Kunci & Pembahasan' : 'Buka Kunci Jawaban & Pembahasan'}</span>
            {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Accordion Explanation Content */}
        <AnimatePresence>
          {showExplanation && (
            <ExplanationBox
              answerKey={item.answerKey}
              concept={item.explanation.concept}
              steps={item.explanation.steps}
              tips={item.explanation.tips}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
