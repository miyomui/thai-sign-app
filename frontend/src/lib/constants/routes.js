/** path ของทุกหน้า — ใช้ค่าจากที่นี่แทนการพิมพ์ '/vocab' เอง */
export const ROUTES = {
  home: '/',
  vocab: '/vocab',
  lessons: '/lessons',
  lesson: (lessonId) => `/lessons/${lessonId}`,
  practice: '/practice',
  ar: '/ar',
  arWord: (vocabId) => `/ar?vocab=${encodeURIComponent(vocabId)}`,
  settings: '/settings',
  help: '/help',
};
