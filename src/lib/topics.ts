import type { QuestionItem } from '../types/tka';

const mathNumbers = new Set([1, 2, 11, 13, 18, 21, 22, 27, 28]);
const mathData = new Set([6, 7, 15, 25, 26, 29, 30]);
const indoStory = new Set([1, 2, 3, 7, 8, 9, 10, 19, 20, 21]);
const indoProcedure = new Set([13, 14, 15]);
const indoPoetry = new Set([25, 26, 27]);

export function topicGroup(question: QuestionItem): string {
  if (question.subject === 'matematika') {
    if (mathNumbers.has(question.id)) return 'Bilangan';
    if (mathData.has(question.id)) return 'Data';
    return 'Geometri dan Pengukuran';
  }
  if (indoStory.has(question.id)) return 'Cerita dan Tokoh';
  if (indoProcedure.has(question.id)) return 'Teks Prosedur';
  if (indoPoetry.has(question.id)) return 'Puisi';
  return 'Informasi dan Fakta';
}
