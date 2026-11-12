import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, EmptyState, IconButton, ProgressBar } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';
import { AvatarStage, useAvatarPlayer } from '@/features/avatar';
import { useProgress } from '@/features/progress';
import { ResultPanel } from '@/features/quiz';
import { useVocabList } from '@/features/vocab';
import { findLesson } from './mock/lessons';

const backLinkClass = 'flex h-10 items-center text-[15px] font-semibold no-underline';

/** หน้าเรียนแบบ flashcard /lessons/:lessonId */
export default function LessonFlashcardPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = findLesson(lessonId);
  const { words: allWords } = useVocabList();
  const { markLearned } = useProgress();
  const words = lesson ? allWords.filter((w) => w.categoryId === lesson.categoryId) : [];

  const [index, setIndex] = useState(0);
  const [known, setKnown] = useState({});
  const [done, setDone] = useState(false);
  const word = words[index];
  const player = useAvatarPlayer({ clipId: word?.id });

  if (!lesson || words.length === 0) {
    return (
      <div className="mx-auto flex max-w-[900px] flex-col gap-5">
        <Link to={ROUTES.lessons} className={backLinkClass}>
          ← กลับไปรายการบทเรียน
        </Link>
        <EmptyState>ไม่พบบทเรียนนี้ หรือบทนี้ยังไม่มีคำศัพท์</EmptyState>
      </div>
    );
  }

  const advance = (knownValue) => {
    const nextKnown = knownValue === undefined ? known : { ...known, [word.id]: knownValue };
    setKnown(nextKnown);
    if (index >= words.length - 1) {
      setDone(true);
      markLearned(Object.keys(nextKnown).filter((id) => nextKnown[id]));
    } else {
      setIndex(index + 1);
    }
  };

  const knownCount = Object.values(known).filter(Boolean).length;
  const shown = done ? words.length : index + 1;

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to={ROUTES.lessons} className={backLinkClass}>
          ← กลับไปรายการบทเรียน
        </Link>
        <span className="font-mono text-sm font-medium text-ink-muted">
          บทที่ {lesson.id} · {lesson.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar value={(shown / words.length) * 100} label="ความคืบหน้าในบท" fillClassName="bg-primary" className="flex-1" />
        <span className="font-display text-[15px] font-semibold">
          {shown} / {words.length}
        </span>
      </div>

      {!done ? (
        <Card rounded="xl" className="flex flex-col gap-5 p-6">
          <AvatarStage player={player} clipId={word.id} label={`3D AVATAR · ${word.id}`} className="aspect-video rounded-btn" />
          <div className="flex flex-col items-center gap-1">
            <h2 className="m-0 font-display text-[40px] font-bold">{word.th}</h2>
            <span className="font-mono text-[13px] text-ink-muted">{word.gloss}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="ghost" onClick={player.replay}>
              ⟲ เล่นซ้ำ
            </Button>
            <Button variant="ghost" active={player.speed === 0.5} onClick={player.toggleSlow}>
              {player.speed === 1 ? 'ช้า 0.5x' : 'ปกติ 1x'}
            </Button>
            <Button variant="ghost" onClick={player.rotateCamera}>
              หมุนมุมมอง · {player.camLabel}
            </Button>
            <Button onClick={() => navigate(ROUTES.arWord(word.id))}>ดูใน AR</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <IconButton label="คำก่อนหน้า" onClick={() => setIndex(Math.max(0, index - 1))}>
              ‹
            </IconButton>
            <div className="flex flex-1 flex-wrap justify-center gap-3">
              <Button variant="soft" size="lg" onClick={() => advance(false)}>
                ยังไม่แน่ใจ
              </Button>
              <Button size="lg" onClick={() => advance(true)}>
                จำได้แล้ว ✓
              </Button>
            </div>
            <IconButton label="คำถัดไป" onClick={() => advance()}>
              ›
            </IconButton>
          </div>
        </Card>
      ) : (
        <Card rounded="xl">
          <ResultPanel
            title={`จบบท${lesson.title}แล้ว`}
            starClassName="size-[72px] text-[34px] text-white"
            actions={
              <>
                <Button variant="ghost" size="lg" className="px-5 font-display font-semibold" onClick={() => navigate(ROUTES.lessons)}>
                  กลับหน้ารายการ
                </Button>
                <Button size="lg" className="px-5" onClick={() => navigate(ROUTES.practice)}>
                  ทำแบบฝึกหัดบทนี้
                </Button>
              </>
            }
          >
            <p className="m-0 text-base text-ink-muted">จำได้ {knownCount} คำ · ลองทำแบบฝึกหัดของบทนี้เพื่อทดสอบความจำ</p>
          </ResultPanel>
        </Card>
      )}
    </div>
  );
}
