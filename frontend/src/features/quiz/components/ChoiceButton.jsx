import { cn } from '@/lib/utils/cn';

/**
 * ปุ่มตัวเลือกคำตอบ
 * state: idle | correct | wrong | disabled
 * มีสัญลักษณ์ ✓ / ✕ ประกอบเสมอ (ไม่ใช้สีอย่างเดียวบอกผล)
 */
export function ChoiceButton({ state = 'idle', onClick, children }) {
  const mark = state === 'correct' ? '✓' : state === 'wrong' ? '✕' : '';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state !== 'idle'}
      className={cn(
        'flex min-h-[60px] items-center justify-center gap-2 rounded-card border-2 px-4 py-3 font-display text-lg font-semibold text-ink transition-all duration-150 ease-out',
        state === 'idle' && 'border-primary bg-surface hover:-translate-y-0.5 hover:border-accent',
        state === 'disabled' && 'border-primary bg-surface',
        state === 'correct' && 'border-ink bg-primary',
        state === 'wrong' && 'border-ink bg-accent',
      )}
    >
      {mark && <span aria-hidden="true">{mark}</span>}
      {children}
    </button>
  );
}

/** คำนวณ state ของตัวเลือกที่ i จากผล useQuiz */
export function choiceState(quiz, i) {
  if (!quiz.answered) return 'idle';
  if (i === quiz.question.answer) return 'correct';
  if (i === quiz.picked) return 'wrong';
  return 'disabled';
}
