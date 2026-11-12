import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Modal } from '@/components/ui';
import { getCategory } from '@/lib/constants/categories';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';
import { AvatarStage, useAvatarPlayer } from '@/features/avatar';

/** หน้าต่างรายละเอียดคำ: อวตาร + เล่น / เล่นซ้ำ / ช้า 0.5x / ดูแบบ AR */
export function WordDetailModal({ word, onClose }) {
  const navigate = useNavigate();
  const player = useAvatarPlayer({ clipId: word?.id });
  if (!word) return null;
  const category = getCategory(word.categoryId);

  const goAR = () => {
    onClose();
    navigate(ROUTES.arWord(word.id));
  };

  return (
    <Modal open onClose={onClose} labelledBy="word-modal-title">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 id="word-modal-title" className="m-0 font-display text-[32px] font-bold">
            {word.th}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-full px-2.5 py-0.5 text-[13px]', category?.chipClass)}>{category?.name}</span>
            <span className="font-mono text-[13px] text-ink-muted">
              {word.id} · {word.gloss}
            </span>
          </div>
        </div>
        <IconButton label="ปิด" onClick={onClose}>
          ✕
        </IconButton>
      </div>

      <AvatarStage player={player} clipId={word.id} label={`วิดีโอ / อวตาร · ${word.id}`} className="aspect-[16/10] rounded-btn" />

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" className="px-[18px]" onClick={player.toggle}>
          {player.playing ? '⏸' : '▶'} เล่น
        </Button>
        <Button variant="ghost" className="font-normal" onClick={player.replay}>
          ⟲ เล่นซ้ำ
        </Button>
        <Button variant="ghost" className="font-normal" active={player.speed === 0.5} onClick={player.toggleSlow}>
          {player.speed === 1 ? 'ช้า 0.5x' : 'ปกติ 1x'}
        </Button>
        <div className="flex-1" />
        <Button className="px-[18px]" onClick={goAR}>
          ดูแบบ AR
        </Button>
      </div>
      <p className="m-0 text-sm text-ink-muted">
        สีหน้าประกอบ: {word.facialExpression ?? 'ปกติ (ยังไม่มีข้อมูล facial_expression)'}
      </p>
    </Modal>
  );
}
