import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Sparkles, GraduationCap } from 'lucide-react';
import { storage } from '../../lib/storage';
import { tapScale } from '../../lib/motion';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  badgeText?: string;
  badgeColor?: 'emerald' | 'amber' | 'indigo';
}

export const Header: React.FC<HeaderProps> = ({
  title = 'TKA SD Mastery',
  subtitle,
  showBack = false,
  onBack,
  badgeText,
  badgeColor = 'indigo'
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setTheme(storage.getTheme());
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storage.setTheme(next);
  };

  const badgeClasses = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  }[badgeColor];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && onBack ? (
            <motion.button
              whileTap={tapScale}
              onClick={onBack}
              aria-label="Kembali"
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
          )}

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                {title}
              </h1>
              {badgeText && (
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeClasses}`}>
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs mt-0.5">
                {subtitle}
              </p>
            ) : (
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-400" /> Pusmendik Resmi
              </span>
            )}
          </div>
        </div>

        {/* Right Action: Theme Toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={tapScale}
            onClick={toggleTheme}
            aria-label="Ganti Tema Tampilan"
            className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
