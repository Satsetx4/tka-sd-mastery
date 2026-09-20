import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lightbulb, Compass, Key } from 'lucide-react';
import { MathView } from '../ui/MathView';

interface ExplanationBoxProps {
  officialKey: string;
  concept: string;
  steps: string[];
  tips?: string;
  textEvidence?: string;
}

export const ExplanationBox: React.FC<ExplanationBoxProps> = ({
  officialKey,
  concept,
  steps,
  tips,
  textEvidence
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="overflow-hidden mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80"
    >
      <div className="rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/70 dark:border-indigo-900/40 p-4 sm:p-5 space-y-4">
        {/* Official Key Banner */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-indigo-200/50 dark:border-indigo-900/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                Kunci Jawaban Resmi Pusmendik
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {officialKey}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi Resmi
          </span>
        </div>

        {/* Concept / Core Rule */}
        <div className="flex items-start gap-2.5 bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-950">
          <Compass className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <strong className="text-indigo-600 dark:text-indigo-400 font-semibold block mb-0.5">
              Konsep Inti Materi:
            </strong>
            <MathView content={concept} />
          </div>
        </div>

        {/* Step by Step Breakdown */}
        {steps && steps.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Langkah-langkah Pengerjaan:</span>
            </h4>
            <div className="space-y-2 text-xs">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-white/50 dark:bg-slate-900/30 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800/50"
                >
                  <span className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-x-auto">
                    <MathView content={step} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips & Smart Trick */}
        {tips && (
          <div className="flex items-start gap-2.5 bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-amber-600 dark:text-amber-400 font-semibold block mb-0.5">
                Tips Trik Praktis:
              </strong>
              <MathView content={tips} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
