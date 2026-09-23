import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav, NavTab } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { StudentFormModal } from './components/features/StudentFormModal';
import { matematikaData } from './data/matematikaData';
import { bahasaIndonesiaData } from './data/bahasaIndonesiaData';
import { storage } from './lib/storage';
import type { ExamAnswers, ExamResult, SubjectType, StudentProfile, UserExamSession } from './types/tka';
import { EXAM_DURATION_MS, normalizeAnswers, scoreExam } from './lib/exam';
import { hashForView, routeFromHash, type CurrentView } from './lib/routes';

const StudyPage = React.lazy(() => import('./pages/StudyPage').then(module => ({ default: module.StudyPage })));
const ReportPage = React.lazy(() => import('./pages/ReportPage').then(module => ({ default: module.ReportPage })));
const CbtExamView = React.lazy(() => import('./components/features/CbtExamView').then(module => ({ default: module.CbtExamView })));
const ScoreReportModal = React.lazy(() => import('./components/features/ScoreReportModal').then(module => ({ default: module.ScoreReportModal })));

export function App() {
  const [view, setView] = useState<CurrentView>(() => {
    if (location.hash) return routeFromHash(location.hash, !!storage.getActiveExam(), false).view;
    const saved = storage.getView();
    return saved === 'study_math' || saved === 'study_indo' || saved === 'report' ? saved : 'home';
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => storage.getBookmarks());
  const [studiedProgress, setStudiedProgress] = useState<Record<string, boolean>>(() => storage.getStudyProgress());
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => storage.getStudentProfile());
  
  // Student modal & CBT trigger
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [pendingExamSubject, setPendingExamSubject] = useState<SubjectType>('matematika');

  // CBT state
  const [examSubject, setExamSubject] = useState<SubjectType>(() => storage.getActiveExam()?.subject ?? 'matematika');
  const [examAnswers, setExamAnswers] = useState<ExamAnswers>({});
  const [activeExam, setActiveExam] = useState<UserExamSession | null>(() => storage.getActiveExam());
  const activeDeadline = activeExam?.deadline;
  const activeSubject = activeExam?.subject;
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);
  const [jumpQuestionId, setJumpQuestionId] = useState<number | null>(() => routeFromHash(location.hash, !!storage.getActiveExam(), false).questionId);

  useEffect(() => {
    if (view === 'home') storage.clearView();
    else if (view !== 'cbt_math' && view !== 'cbt_indo' && view !== 'cbt_result') storage.setView(view);
  }, [view]);

  useEffect(() => {
    const target = hashForView(view, jumpQuestionId);
    if (location.hash !== target) location.hash = target;
  }, [view, jumpQuestionId]);

  useEffect(() => {
    const onHashChange = () => {
      const route = routeFromHash(location.hash, !!activeExam, !!lastResult);
      if ((view === 'cbt_math' || view === 'cbt_indo') && route.view !== view &&
        !window.confirm('Tinggalkan latihan? Jawaban tersimpan, tetapi waktu tetap berjalan.')) {
        history.pushState(null, '', hashForView(view, jumpQuestionId));
        return;
      }
      setJumpQuestionId(route.questionId);
      if (route.view === 'cbt_math' || route.view === 'cbt_indo') setExamSubject(activeExam?.subject ?? 'matematika');
      setView(route.view);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [view, activeExam, lastResult, jumpQuestionId]);

  useEffect(() => {
    if (activeDeadline === undefined || view === 'cbt_math' || view === 'cbt_indo') return;
    const finishExpired = () => {
      const saved = storage.getActiveExam();
      if (!saved || saved.deadline > Date.now()) return;
      const questions = saved.subject === 'matematika' ? matematikaData : bahasaIndonesiaData;
      const answers = normalizeAnswers(questions, saved.answers);
      const now = Date.now();
      const result: ExamResult = { id: now, subject: saved.subject, finishedAt: now, answers, ...scoreExam(questions, answers) };
      storage.clearActiveExam();
      storage.saveExamResult(result);
      setActiveExam(null);
      setExamSubject(saved.subject);
      setExamAnswers(answers);
      setLastResult(result);
      setView('cbt_result');
    };
    const timeout = window.setTimeout(finishExpired, Math.max(0, activeDeadline - Date.now()) + 25);
    return () => window.clearTimeout(timeout);
  }, [activeDeadline, activeSubject, view]);

  const handleExamProgress = useCallback((session: UserExamSession) => {
    storage.setActiveExam(session);
    setActiveExam(session);
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

  // Trigger CBT flow: always show Student Confirmation Form first
  const handleTriggerExam = (subj: SubjectType) => {
    if (activeExam) {
      setExamSubject(activeExam.subject);
      setView(activeExam.subject === 'matematika' ? 'cbt_math' : 'cbt_indo');
      return;
    }
    setPendingExamSubject(subj);
    setShowStudentModal(true);
  };

  const handleStudentFormSubmit = (profile: StudentProfile) => {
    storage.setStudentProfile(profile);
    setStudentProfile(profile);
    setShowStudentModal(false);
    setExamSubject(pendingExamSubject);
    const now = Date.now();
    const session: UserExamSession = {
      subject: pendingExamSubject, startTime: now, deadline: now + EXAM_DURATION_MS,
      answers: {}, doubtList: [], currentIndex: 0,
    };
    storage.setActiveExam(session);
    setActiveExam(session);
    setView(pendingExamSubject === 'matematika' ? 'cbt_math' : 'cbt_indo');
  };

  // Nav actions
  const handleNavSelect = (tab: NavTab) => {
    if (tab === 'home') setView('home');
    else if (tab === 'math') setView('study_math');
    else if (tab === 'indo') setView('study_indo');
    else if (tab === 'cbt') {
      handleTriggerExam('matematika');
    } else if (tab === 'report') setView('report');
  };

  const handleFinishExam = (answers: ExamAnswers) => {
    const questions = examSubject === 'matematika' ? matematikaData : bahasaIndonesiaData;
    const totals = scoreExam(questions, answers);
    const result: ExamResult = {
      id: Date.now(), subject: examSubject, finishedAt: Date.now(),
      answers, ...totals,
    };
    storage.saveExamResult(result);
    storage.clearActiveExam();
    setActiveExam(null);
    setLastResult(result);
    setExamAnswers(answers);
    setView('cbt_result');
  };

  const openStudy = (subject: SubjectType, questionId?: number) => {
    setJumpQuestionId(questionId ?? null);
    setView(subject === 'matematika' ? 'study_math' : 'study_indo');
  };

  const mathStudiedCount = Object.keys(studiedProgress).filter(k => k.startsWith('matematika-') && studiedProgress[k]).length;
  const indoStudiedCount = Object.keys(studiedProgress).filter(k => k.startsWith('bahasa_indonesia-') && studiedProgress[k]).length;

  // Header configs per view
  let headerTitle = 'TKA SD Mastery';
  let headerSubtitle = studentProfile?.name
    ? `${studentProfile.name}${studentProfile.school ? ` (${studentProfile.school})` : ''}`
    : 'Bank Soal & Pembahasan Kelas 6';
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
    headerTitle = 'Hasil Latihan CBT';
    headerSubtitle = examSubject === 'matematika' ? 'Matematika SD' : 'Bahasa Indonesia SD';
    showBack = true;
    onBack = () => setView('home');
    badgeText = 'Rapor';
    badgeColor = 'indigo';
  } else if (view === 'report') {
    headerTitle = 'Rapor Belajar Siswa';
    headerSubtitle = studentProfile ? studentProfile.name : 'Progres belajar dan hasil latihan';
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
        <React.Suspense fallback={<div role="status" className="py-12 text-center">Memuat halaman…</div>}>
        {view === 'home' && (
          <HomePage
            onOpenStudy={openStudy}
            onOpenExam={handleTriggerExam}
            activeExam={activeExam}
            mathStudiedCount={mathStudiedCount}
            indoStudiedCount={indoStudiedCount}
            bookmarkCount={bookmarks.length}
          />
        )}

        {view === 'study_math' && (
          <StudyPage
            key={`matematika-${jumpQuestionId ?? 'all'}`}
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
            key={`bahasa_indonesia-${jumpQuestionId ?? 'all'}`}
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
            subjectName="Matematika"
            questions={matematikaData}
            session={activeExam!}
            onProgress={handleExamProgress}
            onFinishExam={handleFinishExam}
            onExit={() => setView('home')}
          />
        )}

        {view === 'cbt_indo' && (
          <CbtExamView
            subjectName="Bahasa Indonesia"
            questions={bahasaIndonesiaData}
            session={activeExam!}
            onProgress={handleExamProgress}
            onFinishExam={handleFinishExam}
            onExit={() => setView('home')}
          />
        )}

        {view === 'cbt_result' && (
          <ScoreReportModal
            subjectName={examSubject === 'matematika' ? 'Matematika' : 'Bahasa Indonesia'}
            questions={examSubject === 'matematika' ? matematikaData : bahasaIndonesiaData}
            userAnswers={examAnswers}
            result={lastResult}
            studentProfile={studentProfile}
            onRetry={() => handleTriggerExam(examSubject)}
            onGoHome={() => setView('home')}
            onReviewQuestion={(qId) => {
              openStudy(examSubject, qId);
            }}
          />
        )}

        {view === 'report' && (
          <ReportPage
            mathStudiedCount={mathStudiedCount}
            indoStudiedCount={indoStudiedCount}
            bookmarks={bookmarks}
            onOpenStudy={openStudy}
          />
        )}
        </React.Suspense>
      </div>

      {/* Student Form Modal before CBT */}
      {showStudentModal && <StudentFormModal
        isOpen={showStudentModal}
        subjectTitle={pendingExamSubject === 'matematika' ? 'Matematika' : 'Bahasa Indonesia'}
        initialProfile={studentProfile}
        onClose={() => setShowStudentModal(false)}
        onSubmit={handleStudentFormSubmit}
      />}

      {view !== 'cbt_math' && view !== 'cbt_indo' && (
        <>
          <Footer />
          <BottomNav activeTab={activeNavTab} onSelectTab={handleNavSelect} />
        </>
      )}
    </div>
  );
}

export default App;
