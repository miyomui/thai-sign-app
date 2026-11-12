import { cn } from '@/lib/utils/cn';

/** ปุ่มหัวใจ บันทึก/เลิกบันทึกคำศัพท์ */
export function HeartButton({ saved, onToggle, label = 'บันทึกคำศัพท์', size = 'lg', bordered = false, className }) {
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        'inline-flex flex-none items-center justify-center rounded-full',
        size === 'lg' ? 'size-11 text-xl' : 'size-10 text-lg',
        bordered ? 'border border-line' : 'border-none',
        saved ? 'bg-surface text-accent' : bordered ? 'bg-card text-ink' : 'bg-surface text-ink',
        className,
      )}
    >
      <span aria-hidden="true">{saved ? '♥' : '♡'}</span>
    </button>
  );
}
