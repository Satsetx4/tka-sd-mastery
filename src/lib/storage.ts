// Safe LocalStorage wrapper with defensive error handling
import type { ExamResult, StudentProfile, UserExamSession } from '../types/tka';

const THEME_KEY = 'tka_theme';
const BOOKMARKS_KEY = 'tka_bookmarks';
const STUDY_PROGRESS_KEY = 'tka_study_progress';
const EXAM_HISTORY_KEY = 'tka_exam_history';
const STUDENT_PROFILE_KEY = 'tka_student_profile';
const ACTIVE_EXAM_KEY = 'tka_active_exam';
const VIEW_KEY = 'tka_view';

export const storage = {
  getTheme: (): 'light' | 'dark' => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  },

  getStudentProfile: (): StudentProfile | null => {
    try {
      const raw = localStorage.getItem(STUDENT_PROFILE_KEY);
      const value: unknown = raw ? JSON.parse(raw) : null;
      if (!value || typeof value !== 'object' ||
        typeof (value as StudentProfile).name !== 'string' || typeof (value as StudentProfile).school !== 'string') return null;
      const profile = { name: (value as StudentProfile).name, school: (value as StudentProfile).school };
      if ('nisn' in value || 'gender' in value) {
        try { localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile)); } catch { /* storage unavailable */ }
      }
      return profile;
    } catch {
      return null;
    }
  },

  setStudentProfile: (profile: StudentProfile): void => {
    try {
      localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  },

  getActiveExam: (): UserExamSession | null => {
    try {
      const raw = localStorage.getItem(ACTIVE_EXAM_KEY);
      if (!raw) return null;
      const value: unknown = JSON.parse(raw);
      if (!value || typeof value !== 'object') return null;
      const exam = value as UserExamSession;
      if (!['matematika', 'bahasa_indonesia'].includes(exam.subject) ||
        !Number.isFinite(exam.deadline) || !Number.isFinite(exam.startTime) ||
        !Number.isInteger(exam.currentIndex) || !exam.answers || typeof exam.answers !== 'object' ||
        !Array.isArray(exam.doubtList)) return null;
      return exam;
    } catch { return null; }
  },

  setActiveExam: (exam: UserExamSession): void => {
    try { localStorage.setItem(ACTIVE_EXAM_KEY, JSON.stringify(exam)); } catch { /* storage unavailable */ }
  },

  clearActiveExam: (): void => {
    try { localStorage.removeItem(ACTIVE_EXAM_KEY); } catch { /* storage unavailable */ }
  },

  getView: (): string | null => {
    try { return localStorage.getItem(VIEW_KEY); } catch { return null; }
  },

  setView: (view: string): void => {
    try { localStorage.setItem(VIEW_KEY, view); } catch { /* storage unavailable */ }
  },

  clearView: (): void => {
    try { localStorage.removeItem(VIEW_KEY); } catch { /* storage unavailable */ }
  },

  getBookmarks: (): string[] => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      const value: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(value) ? value.filter((key): key is string => typeof key === 'string') : [];
    } catch {
      return [];
    }
  },

  toggleBookmark: (key: string): boolean => {
    try {
      const list = storage.getBookmarks();
      const index = list.indexOf(key);
      let updated: string[];
      let isBookmarked: boolean;
      if (index > -1) {
        updated = list.filter(k => k !== key);
        isBookmarked = false;
      } else {
        updated = [...list, key];
        isBookmarked = true;
      }
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return isBookmarked;
    } catch {
      return false;
    }
  },

  getStudyProgress: (): Record<string, boolean> => {
    try {
      const raw = localStorage.getItem(STUDY_PROGRESS_KEY);
      const value: unknown = raw ? JSON.parse(raw) : {};
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
      return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, boolean] => typeof entry[1] === 'boolean'));
    } catch {
      return {};
    }
  },

  markStudied: (key: string, isStudied: boolean = true): void => {
    try {
      const prog = storage.getStudyProgress();
      prog[key] = isStudied;
      localStorage.setItem(STUDY_PROGRESS_KEY, JSON.stringify(prog));
    } catch {
      // ignore
    }
  },

  getExamHistory: (): ExamResult[] => {
    try {
      const raw = localStorage.getItem(EXAM_HISTORY_KEY);
      const value: unknown = raw ? JSON.parse(raw) : [];
      return Array.isArray(value) ? value.filter((item): item is ExamResult =>
        !!item && typeof item === 'object' && typeof item.score === 'number' &&
        typeof item.finishedAt === 'number' && ['matematika', 'bahasa_indonesia'].includes(item.subject)) : [];
    } catch {
      return [];
    }
  },

  saveExamResult: (result: ExamResult): void => {
    try {
      const history = storage.getExamHistory();
      history.unshift(result);
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
    } catch {
      // ignore
    }
  },

  resetAllData: (): void => {
    for (const key of [THEME_KEY, BOOKMARKS_KEY, STUDY_PROGRESS_KEY, EXAM_HISTORY_KEY, STUDENT_PROFILE_KEY, ACTIVE_EXAM_KEY, VIEW_KEY]) {
      try { localStorage.removeItem(key); } catch { /* storage unavailable */ }
    }
  }
};
