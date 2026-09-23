import { expect, it } from 'vitest';
import { hashForView, routeFromHash } from './routes';

it('opens a deep link to a specific study question', () => {
  expect(routeFromHash('#/study/matematika/27', false, false)).toEqual({ view: 'study_math', questionId: 27 });
  expect(hashForView('study_indo', 5)).toBe('#/study/bahasa_indonesia/5');
});

it('only restores an exam route when an active session exists', () => {
  expect(routeFromHash('#/exam/matematika', false, false).view).toBe('home');
  expect(routeFromHash('#/exam/matematika', true, false).view).toBe('cbt_math');
  expect(routeFromHash('#/result', false, false).view).toBe('report');
});
