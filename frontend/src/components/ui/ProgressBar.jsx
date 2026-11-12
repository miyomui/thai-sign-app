import { cn } from '@/lib/utils/cn';

/**
 * แถบความก้าวหน้า
 * value: 0–100
 * fillClassName: สีแท่ง (ค่าเริ่มต้น ชมพู accent)
 */
export function ProgressBar({ value, label, height = 'h-2', fillClassName = 'bg-accent', className }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
      className={cn('w-full overflow-hidden rounded-full bg-surface', height, className)}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-250 ease-out', fillClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
