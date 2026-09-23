import { describe, expect, it } from 'vitest';
import { matematikaData } from '../data/matematikaData';
import { bahasaIndonesiaData } from '../data/bahasaIndonesiaData';
import type { ExamAnswers, QuestionItem } from '../types/tka';
import { isCorrect, keyLetters, normalizeAnswer, scoreExam, validateDataset } from './exam';

const datasets = [matematikaData, bahasaIndonesiaData];

function perfectAnswers(questions: QuestionItem[]): ExamAnswers {
  return Object.fromEntries(questions.map(question => [question.id,
    question.type === 'matrix'
      ? Object.fromEntries((question.matrixRows ?? []).map(row => [row.id, row.correctAnswer.trim()]))
      : question.type === 'pg_kompleks' ? keyLetters(question) : keyLetters(question)[0],
  ]));
}

describe('60 question dataset and scoring', () => {
  for (const questions of datasets) {
    const subject = questions[0].subject;
    it(`${subject} has valid questions and a perfect answer scores 100`, () => {
      expect(questions).toHaveLength(30);
      expect(validateDataset(questions)).toEqual([]);
      expect(scoreExam(questions, perfectAnswers(questions))).toEqual({ correct: 30, wrong: 0, empty: 0, score: 100 });
    });
  }

  it('requires every selected option in complex multiple choice', () => {
    const question = bahasaIndonesiaData.find(item => item.type === 'pg_kompleks')!;
    const keys = keyLetters(question);
    expect(isCorrect(question, keys)).toBe(true);
    expect(isCorrect(question, keys.slice(0, 1))).toBe(false);
    expect(isCorrect(question, [...keys, 'A'])).toBe(false);
    expect(normalizeAnswer(question, [...keys, keys[0], 'Z'])).toEqual(keys.sort());
  });

  it('treats a partially answered matrix as empty', () => {
    const question = matematikaData.find(item => item.type === 'matrix')!;
    expect(scoreExam([question], { [question.id]: { A: 'Benar' } }).empty).toBe(1);
  });
});
