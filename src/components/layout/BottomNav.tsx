import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calculator, BookOpen, Clock, Award } from 'lucide-react';
import { tapScale } from '../../lib/motion';

export type NavTab = 'home' | 'math' | 'indo' | 'cbt' | 'report';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'math', label: 'Matematika', icon: Calculator },
    { id: 'indo', label: 'B. Indonesia', icon: BookOpen },
    { id: 'cbt', label: 'Latihan CBT', icon: Clock },
    { id: 'report', label: 'Rapor', icon: Award },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="max-w-md mx-auto px-3 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={tapScale}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all relative cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
