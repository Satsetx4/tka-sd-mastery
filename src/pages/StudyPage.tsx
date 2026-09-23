import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { QuestionItem, SubjectType } from '../types/tka';
import { StudyCard } from '../components/features/StudyCard';
import { topicGroup } from '../lib/topics';

interface StudyPageProps {
  subject: SubjectType;
  questions: QuestionItem[];
  bookmarks: string[];
  studiedProgress: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onToggleStudied: (id: string) => void;
  targetQuestionId?: number | null;
}

export const StudyPage: React.FC<StudyPageProps> = ({
  subject,
  questions,
  bookmarks,
  studiedProgress,
  onToggleBookmark,
  onToggleStudied,
  targetQuestionId,
}) => {
  type StudyFilter = 'all' | 'unstudied' | 'studied' | 'bookmarked';
  const [filterType, setFilterType] = useState<StudyFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(targetQuestionId == null ? 5 : questions.length);

  useEffect(() => {
    if (targetQuestionId == null) return;
    const scrollToTarget = () => document.getElementById(`question-${subject}-${targetQuestionId}`)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    const frame = requestAnimationFrame(scrollToTarget);
    // Images above the target can change height after the first layout.
    const retries = [window.setTimeout(scrollToTarget, 300), window.setTimeout(scrollToTarget, 900)];
    return () => { cancelAnimationFrame(frame); retries.forEach(window.clearTimeout); };
  }, [subject, targetQuestionId, questions.length]);

  // Extract unique topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => set.add(topicGroup(q)));
    return Array.from(set);
  }, [questions]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const key = `${q.subject}-${q.id}`;
      const isStudied = !!studiedProgress[key];
      const isBookmarked = bookmarks.includes(key);

      // Status filter
      if (filterType === 'studied' && !isStudied) return false;
      if (filterType === 'unstudied' && isStudied) return false;
      if (filterType === 'bookmarked' && !isBookmarked) return false;

      // Topic filter
      if (selectedTopic !== 'all' && topicGroup(q) !== selectedTopic) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchNumber = q.id.toString() === query;
        const matchText = q.questionText.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchStimulus = q.stimulusText?.toLowerCase().includes(query);
        if (!matchNumber && !matchText && !matchTopic && !matchStimulus) return false;
      }

      return true;
    });
  }, [questions, filterType, selectedTopic, searchQuery, studiedProgress, bookmarks]);

  return (
    <div className="space-y-5 text-left pb-16">
      {/* Search & Topic Selector Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nomor soal, topik, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1 text-xs">
          {([
            { id: 'all', label: `Semua (${questions.length})` },
            { id: 'unstudied', label: 'Belum Dipelajari' },
            { id: 'studied', label: 'Sudah Dipelajari' },
            { id: 'bookmarked', label: 'Ditandai' },
          ] as { id: StudyFilter; label: string }[]).map((pill) => {
            const isActive = filterType === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => { setFilterType(pill.id); setVisibleCount(5); }}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Topic dropdown if multiple */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-transparent text-xs text-slate-600 dark:text-slate-300 font-medium focus:outline-none cursor-pointer truncate max-w-full"
          >
            <option value="all">Semua Kelompok Materi</option>
            {topics.map((t) => (
              <option key={t} value={t} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-3xl">🔍</span>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Tidak ada soal yang cocok</h4>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau pilih filter lain.</p>
          </div>
        ) : (
          filteredQuestions.slice(0, visibleCount).map((q) => {
            const key = `${q.subject}-${q.id}`;
            return (
              <div key={q.id} id={`question-${subject}-${q.id}`} className="scroll-mt-24">
              <StudyCard
                item={q}
                isBookmarked={bookmarks.includes(key)}
                isStudied={!!studiedProgress[key]}
                onToggleBookmark={onToggleBookmark}
                onToggleStudied={onToggleStudied}
              />
              </div>
            );
          })
        )}
      </div>
      {filteredQuestions.length > visibleCount && <button onClick={() => setVisibleCount(count => count + 5)} className="w-full min-h-11 rounded-xl border border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold">Tampilkan 5 soal berikutnya ({filteredQuestions.length - visibleCount} tersisa)</button>}
    </div>
  );
};
