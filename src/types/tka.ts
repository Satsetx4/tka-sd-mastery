export type SubjectType = 'matematika' | 'bahasa_indonesia';

export type QuestionType = 'pg_biasa' | 'pg_kompleks' | 'matrix';

export interface OptionItem {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  isMath?: boolean;
}

export interface MatrixRow {
  id: string; // 'A', 'B', 'C'
  statement: string;
  correctAnswer: string;
}

export type QuestionAnswer = string | string[] | Record<string, string>;
export type ExamAnswers = Record<number, QuestionAnswer>;

export interface QuestionItem {
  id: number;
  subject: SubjectType;
  topic: string;
  type: QuestionType;
  stimulusTitle?: string | null;
  stimulusText?: string | null;
  stimulusImage?: string | null;
  questionText: string;
  questionImage?: string | null;
  options?: OptionItem[] | null;
  matrixRows?: MatrixRow[] | null;
  answerKey: string;
  explanation: {
    concept: string;
    steps: string[];
    tips?: string;
    textEvidence?: string;
  };
}

export interface StudentProfile {
  name: string;
  school: string;
}

export interface UserExamSession {
  subject: SubjectType;
  startTime: number;
  deadline: number;
  answers: ExamAnswers;
  doubtList: number[];
  currentIndex: number;
}

export interface ExamResult {
  id: number;
  subject: SubjectType;
  finishedAt: number;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
  answers: ExamAnswers;
}
