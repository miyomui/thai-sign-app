import { cn } from '@/lib/utils/cn';

const TONES = {
  outline: 'border border-line bg-transparent text-ink',
  white: 'border border-line bg-card text-ink',
  soft: 'border-none bg-surface text-ink',
  secondary: 'border-none bg-secondary text-ink',
  primary: 'border-none bg-primary-strong text-white',
};

const SIZES = { sm: 'size-9 text-sm', md: 'size-10 text-base', lg: 'size-11 text-lg' };

/**
 * ปุ่มกลมที่มีแค่ไอคอน — ต้องใส่ label เสมอ (ใช้เป็น aria-label)
 */
export function IconButton({ label, tone = 'outline', size = 'lg', className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn('inline-flex flex-none items-center justify-center rounded-full', TONES[tone], SIZES[size], className)}
      {...props}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
