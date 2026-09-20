// Safe LocalStorage wrapper with defensive error handling

const THEME_KEY = 'tka_theme';
const BOOKMARKS_KEY = 'tka_bookmarks';
const STUDY_PROGRESS_KEY = 'tka_study_progress';
const EXAM_HISTORY_KEY = 'tka_exam_history';

export const storage = {
  getTheme: (): 'light' | 'dark' => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
    } catch {
      return 'dark';
    }
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  },

  getBookmarks: (): string[] => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : [];
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
      return raw ? JSON.parse(raw) : {};
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

  getExamHistory: (): any[] => {
    try {
      const raw = localStorage.getItem(EXAM_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveExamResult: (result: any): void => {
    try {
      const history = storage.getExamHistory();
      history.unshift({ ...result, id: Date.now() });
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
    } catch {
      // ignore
    }
  },

  resetAllData: (): void => {
    try {
      localStorage.removeItem(BOOKMARKS_KEY);
      localStorage.removeItem(STUDY_PROGRESS_KEY);
      localStorage.removeItem(EXAM_HISTORY_KEY);
    } catch {
      // ignore
    }
  }
};
