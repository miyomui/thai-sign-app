import { cn } from '@/lib/utils/cn';

/** หน้าสรุปผล: ดาวทอง + หัวข้อ + ข้อความ + ปุ่ม (children) */
export function ResultPanel({ title, children, actions, starClassName, className }) {
  return (
    <div className={cn('flex flex-col items-center gap-3.5 px-6 py-12 text-center', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'flex items-center justify-center rounded-full border-2 border-ink bg-gold',
          starClassName ?? 'size-20 text-[38px] text-ink',
        )}
      >
        ★
      </span>
      <h2 className="m-0 font-display text-[28px] font-semibold">{title}</h2>
      {children}
      {actions && <div className="mt-2 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}
