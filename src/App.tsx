import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav, NavTab } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { StudyPage } from './pages/StudyPage';
import { ReportPage } from './pages/ReportPage';
import { CbtExamView } from './components/features/CbtExamView';
import { ScoreReportModal } from './components/features/ScoreReportModal';
import { matematikaData } from './data/matematikaData';
import { bahasaIndonesiaData } from './data/bahasaIndonesiaData';
import { storage } from './lib/storage';
import { SubjectType } from './types/tka';

type CurrentView = 
  | 'home' 
  | 'study_math' 
  | 'study_indo' 
  | 'cbt_math' 
  | 'cbt_indo' 
  | 'cbt_result' 
  | 'report';

export function App() {
  const [view, setView] = useState<CurrentView>('home');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [studiedProgress, setStudiedProgress] = useState<Record<string, boolean>>({});
  
  // CBT state
  const [examSubject, setExamSubject] = useState<SubjectType>('matematika');
  const [examAnswers, setExamAnswers] = useState<Record<number, any>>({});
  const [examDoubts, setExamDoubts] = useState<number[]>([]);
  const [jumpQuestionId, setJumpQuestionId] = useState<number | null>(null);

  // Sync state on mount
  useEffect(() => {
    setBookmarks(storage.getBookmarks());
    setStudiedProgress(storage.getStudyProgress());
  }, []);

  const handleToggleBookmark = (id: string) => {
    storage.toggleBookmark(id);
    setBookmarks(storage.getBookmarks());
  };

  const handleToggleStudied = (id: string) => {
    const current = !!studiedProgress[id];
    storage.markStudied(id, !current);
    setStudiedProgress(storage.getStudyProgress());
  };

  const handleResetData = () => {
    setBookmarks([]);
    setStudiedProgress({});
    setView('home');
  };

  // Nav actions
  const handleNavSelect = (tab: NavTab) => {
    if (tab === 'home') setView('home');
    else if (tab === 'math') setView('study_math');
    else if (tab === 'indo') setView('study_indo');
    else if (tab === 'cbt') {
      setExamSubject('matematika');
      setView('cbt_math');
    } else if (tab === 'report') setView('report');
  };

  const handleFinishExam = (answers: Record<number, any>, doubts: number[]) => {
    setExamAnswers(answers);
    setExamDoubts(doubts);
    setView('cbt_result');
  };

  const mathStudiedCount = Object.keys(studiedProgress).filter(k => k.startsWith('matematika-') && studiedProgress[k]).length;
  const indoStudiedCount = Object.keys(studiedProgress).filter(k => k.startsWith('bahasa_indonesia-') && studiedProgress[k]).length;

  // Header configs per view
  let headerTitle = 'TKA SD Mastery';
  let headerSubtitle = 'Bank Soal & Pembahasan Kelas 6';
  let showBack = false;
  let onBack: (() => void) | undefined = undefined;
  let badgeText: string | undefined = undefined;
  let badgeColor: 'indigo' | 'emerald' | 'amber' = 'indigo';

  if (view === 'study_math') {
    headerTitle = 'Pembahasan Matematika';
    headerSubtitle = '30 Soal & Langkah KaTeX Lengkap';
    showBack = true;
    onBack = () => setView('home');
    badgeText = 'Numerasi';
    badgeColor = 'emerald';
  } else if (view === 'study_indo') {
    headerTitle = 'Pembahasan B. Indonesia';
    headerSubtitle = '30 Soal & Analisis Wacana Lengkap';
    showBack = true;
    onBack = () => setView('home');
    badgeText = 'Literasi';
    badgeColor = 'amber';
  } else if (view === 'cbt_result') {
    headerTitle = 'Hasil Evaluasi Tryout';
    headerSubtitle = examSubject === 'matematika' ? 'Matematika SD' : 'Bahasa Indonesia SD';
    showBack = true;
    onBack = () => setView('home');
    badgeText = 'Rapor';
    badgeColor = 'indigo';
  } else if (view === 'report') {
    headerTitle = 'Rapor Belajar Siswa';
    headerSubtitle = 'Statistik Penguasaan Materi';
    showBack = true;
    onBack = () => setView('home');
    badgeText = 'Statistik';
    badgeColor = 'indigo';
  }

  // Active tab for BottomNav
  let activeNavTab: NavTab = 'home';
  if (view === 'study_math') activeNavTab = 'math';
  else if (view === 'study_indo') activeNavTab = 'indo';
  else if (view === 'cbt_math' || view === 'cbt_indo' || view === 'cbt_result') activeNavTab = 'cbt';
  else if (view === 'report') activeNavTab = 'report';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      {/* Hide header and bottom nav during active CBT exam for full concentration */}
      {view !== 'cbt_math' && view !== 'cbt_indo' && (
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          showBack={showBack}
          onBack={onBack}
          badgeText={badgeText}
          badgeColor={badgeColor}
        />
      )}

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 pt-4">
        {view === 'home' && (
          <HomePage
            onOpenStudy={(subj) => setView(subj === 'matematika' ? 'study_math' : 'study_indo')}
            onOpenExam={(subj) => {
              setExamSubject(subj);
              setView(subj === 'matematika' ? 'cbt_math' : 'cbt_indo');
            }}
            mathStudiedCount={mathStudiedCount}
            indoStudiedCount={indoStudiedCount}
            bookmarkCount={bookmarks.length}
          />
        )}

        {view === 'study_math' && (
          <StudyPage
            subject="matematika"
            questions={matematikaData}
            bookmarks={bookmarks}
            studiedProgress={studiedProgress}
            onToggleBookmark={handleToggleBookmark}
            onToggleStudied={handleToggleStudied}
            targetQuestionId={jumpQuestionId}
          />
        )}

        {view === 'study_indo' && (
          <StudyPage
            subject="bahasa_indonesia"
            questions={bahasaIndonesiaData}
            bookmarks={bookmarks}
            studiedProgress={studiedProgress}
            onToggleBookmark={handleToggleBookmark}
            onToggleStudied={handleToggleStudied}
            targetQuestionId={jumpQuestionId}
          />
        )}

        {view === 'cbt_math' && (
          <CbtExamView
            subjectName="Matematika (Numerasi SD)"
            questions={matematikaData}
            onFinishExam={handleFinishExam}
            onExit={() => setView('home')}
          />
        )}

        {view === 'cbt_indo' && (
          <CbtExamView
            subjectName="Bahasa Indonesia (Literasi SD)"
            questions={bahasaIndonesiaData}
            onFinishExam={handleFinishExam}
            onExit={() => setView('home')}
          />
        )}

        {view === 'cbt_result' && (
          <ScoreReportModal
            subjectName={examSubject === 'matematika' ? 'Matematika (Numerasi SD)' : 'Bahasa Indonesia (Literasi SD)'}
            questions={examSubject === 'matematika' ? matematikaData : bahasaIndonesiaData}
            userAnswers={examAnswers}
            onRetry={() => setView(examSubject === 'matematika' ? 'cbt_math' : 'cbt_indo')}
            onGoHome={() => setView('home')}
            onReviewQuestion={(qId) => {
              setJumpQuestionId(qId);
              setView(examSubject === 'matematika' ? 'study_math' : 'study_indo');
            }}
          />
        )}

        {view === 'report' && (
          <ReportPage
            mathStudiedCount={mathStudiedCount}
            indoStudiedCount={indoStudiedCount}
            bookmarks={bookmarks}
            onOpenStudy={(subj) => setView(subj === 'matematika' ? 'study_math' : 'study_indo')}
            onDataReset={handleResetData}
          />
        )}
      </div>

      {view !== 'cbt_math' && view !== 'cbt_indo' && (
        <>
          <Footer onDataReset={handleResetData} />
          <BottomNav activeTab={activeNavTab} onSelectTab={handleNavSelect} />
        </>
      )}
    </div>
  );
}

export default App;
