import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { CAMERAS, SPEEDS } from '../config';

/** ปุ่มเลือกมุมกล้อง (วางเป็น children ของ AvatarStage) */
export function CameraChips({ player }) {
  return CAMERAS.map((c, i) => (
    <button
      key={c.id}
      type="button"
      aria-pressed={player.camIndex === i}
      onClick={() => player.setCamera(i)}
      className={cn(
        'h-8 rounded-full border-none px-3 text-[13px] font-semibold',
        player.camIndex === i ? 'bg-ink text-bg' : 'bg-white/85 text-ink',
      )}
    >
      {c.label}
    </button>
  ));
}

/**
 * แถบควบคุมใต้อวตาร: ▶/⏸ · แถบเวลา · 0.5x/1x · เล่นซ้ำ · (ปุ่มเพิ่มเติมทาง children)
 */
export function AvatarControls({ player, children }) {
  const onScrub = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    player.seek(((e.clientX - r.left) / r.width) * 100);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') player.seek(player.t + 5);
    if (e.key === 'ArrowLeft') player.seek(player.t - 5);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-card px-3.5 py-3">
      <button
        type="button"
        aria-label={player.playing ? 'หยุด' : 'เล่น'}
        onClick={player.toggle}
        className="flex size-10 flex-none items-center justify-center rounded-full border-none bg-primary-strong text-sm text-white"
      >
        {player.playing ? '⏸' : '▶'}
      </button>

      <div
        role="slider"
        tabIndex={0}
        aria-label="ตำแหน่งการเล่น"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(player.t)}
        onClick={onScrub}
        onKeyDown={onKey}
        className="flex h-5 flex-[1_1_140px] cursor-pointer items-center"
      >
        <div className="relative h-1.5 w-full rounded-full bg-surface">
          <div className="h-full rounded-full bg-accent" style={{ width: `${player.t}%` }} />
          <div
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-card"
            style={{ left: `${player.t}%` }}
          />
        </div>
      </div>

      <div className="flex gap-1 rounded-full border border-line bg-bg p-[3px]">
        {SPEEDS.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={player.speed === v}
            onClick={() => player.setSpeed(v)}
            className={cn(
              'h-[30px] rounded-full border-none px-2.5 text-[13px] font-semibold text-ink',
              player.speed === v ? 'bg-secondary' : 'bg-transparent',
            )}
          >
            {v}x
          </button>
        ))}
      </div>

      <Button variant="ghost" className="h-9 px-3 text-sm" onClick={player.replay}>
        ⟲ เล่นซ้ำ
      </Button>
      {children}
    </div>
  );
}
