import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, HeartButton, Placeholder, ProgressBar } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';
import { useProgress } from '@/features/progress';
import { ChoiceButton, ResultPanel, choiceState, useQuiz } from '@/features/quiz';
import { PRACTICE_QUESTIONS } from './mock/questions';

/** อ่านออกเสียงคำภาษาอังกฤษ (Web Speech API ของเบราว์เซอร์ — ฟรี) */
function speak(text) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {
    // เบราว์เซอร์ไม่รองรับ — ไม่เป็นไร เพราะมีข้อความแสดงอยู่แล้ว
  }
}

const panelClass = 'rounded-panel border-[1.5px] border-primary bg-bg';

/** หน้าฝึกทบทวน /practice */
export default function PracticePage() {
  const quiz = useQuiz(PRACTICE_QUESTIONS);
  const { isSaved, toggleSave, recordQuizResult } = useProgress();
  const q = quiz.question;

  useEffect(() => {
    if (!quiz.done) return;
    recordQuizResult({
      source: 'practice',
      score: quiz.score,
      total: quiz.total,
      wrongIds: quiz.wrongIndexes.map((i) => PRACTICE_QUESTIONS[i].vocabId),
    });
    // บันทึกครั้งเดียวเมื่อทำครบ (จึงใส่แค่ quiz.done ใน dependency)
  }, [quiz.done]);

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-4">
      <Link to={ROUTES.vocab} className="flex h-10 items-center self-start text-[15px] font-semibold no-underline">
        ← กลับไปหน้าคำศัพท์
      </Link>

      {!quiz.done ? (
        <div className={`${panelClass} flex flex-col items-center gap-5 p-6`}>
          <div className="flex w-full items-center gap-4">
            <span className="whitespace-nowrap font-display text-[15px] font-semibold">
              ข้อ {quiz.index + 1}/{quiz.total}
            </span>
            <ProgressBar value={quiz.progressPct} label="ความคืบหน้าการทบทวน" className="flex-1" />
            <HeartButton saved={isSaved(q.vocabId)} onToggle={() => toggleSave(q.vocabId)} />
          </div>

          <h2 className="m-0 font-display text-[44px] font-bold">{q.th}</h2>

          <div className="w-full max-w-[540px] overflow-hidden rounded-card">
            <Placeholder tone="pink" sublabel="ภาพประกอบคำศัพท์" className="aspect-[16/10]" role="img" aria-label={`ภาพประกอบคำว่า ${q.th}`} />
            <button
              type="button"
              onClick={() => speak(q.en)}
              className="flex h-[52px] w-full items-center gap-3 border-none bg-secondary px-4 text-[15px] font-semibold text-ink"
            >
              <span aria-hidden="true" className="flex size-[34px] items-center justify-center rounded-full bg-ink text-xs text-bg">
                ▶
              </span>
              ฟังเสียงคำศัพท์
            </button>
          </div>

          <span className="rounded-full bg-secondary px-[18px] py-2 text-[15px] font-semibold">
            คำว่า “{q.th}” ภาษาอังกฤษคือคำใด
          </span>
          <div className="h-px w-full bg-secondary" />

          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
            {q.choices.map((c, i) => (
              <ChoiceButton key={c} state={choiceState(quiz, i)} onClick={() => quiz.pick(i)}>
                {c}
              </ChoiceButton>
            ))}
          </div>

          <div aria-live="polite" className="flex min-h-[52px] flex-wrap items-center justify-center gap-4">
            {quiz.answered && (
              <>
                <span className="text-base font-semibold">
                  {quiz.isCorrect ? '✓ ถูกต้อง เก่งมาก!' : `✕ ยังไม่ถูก คำตอบที่ถูกคือ “${q.en}”`}
                </span>
                <Button variant="dark" size="lg" onClick={quiz.next}>
                  {quiz.isLast ? 'ดูผลคะแนน' : 'ข้อถัดไป'}
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={panelClass}>
          <ResultPanel
            title="ทบทวนครบแล้ว"
            className="py-14"
            actions={
              <Button variant="dark" size="lg" onClick={quiz.restart}>
                ฝึกอีกครั้ง
              </Button>
            }
          >
            <p className="m-0 text-lg">
              ได้ {quiz.score} จาก {quiz.total} ข้อ
            </p>
          </ResultPanel>
        </div>
      )}
    </div>
  );
}
