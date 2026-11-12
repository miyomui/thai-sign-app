import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, HeartButton, Tag } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';
import { AvatarControls, AvatarStage, CameraChips, useAvatarPlayer } from '@/features/avatar';
import { useProgress } from '@/features/progress';
import { WordInfoTabs } from './WordInfoTabs';

/** การ์ด "คำศัพท์แนะนำวันนี้" — หัวใจของหน้าแรก */
export function FeaturedWordCard({ words }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { isSaved, toggleSave, isLearned } = useProgress();
  const word = words[index];
  const player = useAvatarPlayer({ clipId: word?.id });

  if (!word) return null;

  const next = () => setIndex((index + 1) % words.length);
  const random = () => {
    if (words.length < 2) return;
    let i;
    do i = Math.floor(Math.random() * words.length);
    while (i === index);
    setIndex(i);
  };
  const related = words.filter((_, i) => i !== index).slice(0, 5);

  return (
    <Card as="section" aria-label="คำศัพท์แนะนำวันนี้" className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs font-medium tracking-[.08em] text-ink-muted">คำศัพท์แนะนำวันนี้</span>
          <h2 className="m-0 font-display text-4xl font-bold leading-[1.2]">{word.th}</h2>
          <div className="flex flex-wrap gap-2">
            <Tag className="bg-surface">หมวด: การทักทาย</Tag>
            <Tag className="bg-secondary">ระดับ: พื้นฐาน</Tag>
            {isLearned(word.id) && <Tag className="bg-gold/20">★ เรียนแล้ว</Tag>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="font-display font-semibold" onClick={random}>
            สุ่มคำ
          </Button>
          <Button variant="secondary" onClick={next}>
            คำถัดไป ›
          </Button>
          <HeartButton saved={isSaved(word.id)} onToggle={() => toggleSave(word.id)} label="บันทึกคำนี้" bordered />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex min-w-0 flex-[3_1_420px] flex-col overflow-hidden rounded-btn border border-line">
          <AvatarStage
            player={player}
            clipId={word.id}
            ariaLabel={`โมเดล 3 มิติแสดงท่าทางคำว่า ${word.th}`}
            className="aspect-video"
          >
            <CameraChips player={player} />
          </AvatarStage>
          <AvatarControls player={player}>
            <Button className="h-9 px-3.5 text-sm" onClick={() => navigate(ROUTES.arWord(word.id))}>
              ดูแบบ AR
            </Button>
          </AvatarControls>
        </div>
        <WordInfoTabs
          word={word}
          related={related}
          player={player}
          onPickRelated={(id) => setIndex(words.findIndex((w) => w.id === id))}
        />
      </div>
    </Card>
  );
}
