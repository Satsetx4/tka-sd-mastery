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
  officialKey: string;
  explanation: {
    concept: string;
    steps: string[];
    tips?: string;
    textEvidence?: string;
  };
}

export interface UserExamSession {
  subject: SubjectType;
  startTime: number;
  answers: Record<number, any>;
  doubtList: number[];
  completed: boolean;
  score: number;
  finishedAt?: number;
}
