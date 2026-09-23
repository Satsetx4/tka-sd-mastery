export type CurrentView = 'home' | 'study_math' | 'study_indo' | 'cbt_math' | 'cbt_indo' | 'cbt_result' | 'report';

export function routeFromHash(hash: string, hasActiveExam: boolean, hasResult: boolean): { view: CurrentView; questionId: number | null } {
  const study = /^#\/study\/(matematika|bahasa_indonesia)(?:\/(\d+))?$/.exec(hash);
  if (study) {
    const questionId = study[2] ? Number(study[2]) : null;
    return { view: study[1] === 'matematika' ? 'study_math' : 'study_indo', questionId: questionId && questionId <= 30 ? questionId : null };
  }
  if (hash === '#/report') return { view: 'report', questionId: null };
  if (hash === '#/exam/matematika' && hasActiveExam) return { view: 'cbt_math', questionId: null };
  if (hash === '#/exam/bahasa_indonesia' && hasActiveExam) return { view: 'cbt_indo', questionId: null };
  if (hash === '#/result') return { view: hasResult ? 'cbt_result' : 'report', questionId: null };
  return { view: 'home', questionId: null };
}

export function hashForView(view: CurrentView, questionId: number | null): string {
  switch (view) {
    case 'study_math': return `#/study/matematika${questionId ? `/${questionId}` : ''}`;
    case 'study_indo': return `#/study/bahasa_indonesia${questionId ? `/${questionId}` : ''}`;
    case 'cbt_math': return '#/exam/matematika';
    case 'cbt_indo': return '#/exam/bahasa_indonesia';
    case 'cbt_result': return '#/result';
    case 'report': return '#/report';
    default: return '#/';
  }
}
