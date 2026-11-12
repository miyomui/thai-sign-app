import { cn } from '@/lib/utils/cn';

/**
 * กล่องลายทางแทนภาพ/วิดีโอที่ยังไม่มีของจริง
 * tone: pink | green
 */
export function Placeholder({ tone = 'pink', label, sublabel, className, children, ...props }) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-1.5 text-center',
        tone === 'pink' ? 'stripes-pink' : 'stripes-green',
        className,
      )}
      {...props}
    >
      {label && <span className="font-mono text-xs font-medium tracking-[.08em] text-ink">{label}</span>}
      {sublabel && <span className="font-mono text-xs text-ink-muted">{sublabel}</span>}
      {children}
    </div>
  );
}
