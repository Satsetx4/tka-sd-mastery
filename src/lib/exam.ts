import type { ExamAnswers, QuestionAnswer, QuestionItem } from '../types/tka';

export const EXAM_DURATION_MS = 75 * 60 * 1000;

export function keyLetters(question: QuestionItem): string[] {
  return [...question.answerKey.matchAll(/\(([A-D])\)/g)].map(match => match[1]);
}

export function matrixChoices(question: QuestionItem): string[] {
  return [...new Set((question.matrixRows ?? []).map(row => row.correctAnswer.trim()))];
}

export function normalizeAnswer(question: QuestionItem, value: unknown): QuestionAnswer | undefined {
  if (question.type === 'matrix') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
    const record = value as Record<string, unknown>;
    const allowed = matrixChoices(question);
    const answer: Record<string, string> = {};
    for (const row of question.matrixRows ?? []) {
      const choice = record[row.id];
      if (typeof choice === 'string' && allowed.includes(choice.trim())) answer[row.id] = choice.trim();
    }
    return Object.keys(answer).length ? answer : undefined;
  }
  const optionIds = (question.options ?? []).map(option => option.id);
  if (question.type === 'pg_kompleks') {
    if (!Array.isArray(value)) return undefined;
    const selected = [...new Set(value.filter((item): item is string => typeof item === 'string' && optionIds.includes(item)))].sort();
    return selected.length ? selected : undefined;
  }
  return typeof value === 'string' && optionIds.includes(value) ? value : undefined;
}

export function normalizeAnswers(questions: QuestionItem[], value: unknown): ExamAnswers {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const source = value as Record<string, unknown>;
  const answers: ExamAnswers = {};
  for (const question of questions) {
    const answer = normalizeAnswer(question, source[question.id]);
    if (answer !== undefined) answers[question.id] = answer;
  }
  return answers;
}

export function isComplete(question: QuestionItem, answer: QuestionAnswer | undefined): boolean {
  if (question.type !== 'matrix') return answer !== undefined && (!Array.isArray(answer) || answer.length > 0);
  return !!answer && !Array.isArray(answer) && typeof answer === 'object' &&
    (question.matrixRows ?? []).every(row => typeof answer[row.id] === 'string');
}

export function isCorrect(question: QuestionItem, rawAnswer: unknown): boolean {
  const answer = normalizeAnswer(question, rawAnswer);
  if (!isComplete(question, answer)) return false;
  if (question.type === 'matrix') {
    const selected = answer as Record<string, string>;
    return (question.matrixRows ?? []).every(row => selected[row.id] === row.correctAnswer.trim());
  }
  const expected = keyLetters(question).sort();
  if (question.type === 'pg_kompleks') {
    return JSON.stringify(answer) === JSON.stringify(expected);
  }
  return answer === expected[0];
}

export function scoreExam(questions: QuestionItem[], answers: ExamAnswers) {
  let correct = 0;
  let wrong = 0;
  let empty = 0;
  for (const question of questions) {
    const answer = normalizeAnswer(question, answers[question.id]);
    if (!isComplete(question, answer)) empty++;
    else if (isCorrect(question, answer)) correct++;
    else wrong++;
  }
  return { correct, wrong, empty, score: questions.length ? Math.round(correct / questions.length * 100) : 0 };
}

export function validateDataset(questions: QuestionItem[]): string[] {
  const errors: string[] = [];
  const ids = new Set<number>();
  for (const question of questions) {
    const label = `${question.subject} #${question.id}`;
    if (ids.has(question.id)) errors.push(`${label}: duplicate id`);
    ids.add(question.id);
    if (!question.topic.trim() || !question.questionText.trim()) errors.push(`${label}: missing topic or text`);
    if (question.type === 'matrix') {
      const rows = question.matrixRows ?? [];
      if (!rows.length || matrixChoices(question).length < 2 || rows.some(row => !row.correctAnswer.trim())) errors.push(`${label}: invalid matrix choices`);
    } else {
      const options = question.options ?? [];
      const keys = keyLetters(question);
      if (options.length < 2 || new Set(options.map(option => option.id)).size !== options.length ||
        keys.length !== (question.type === 'pg_biasa' ? 1 : 2) ||
        keys.some(key => !options.some(option => option.id === key))) errors.push(`${label}: invalid options or key`);
    }
  }
  return errors;
}
