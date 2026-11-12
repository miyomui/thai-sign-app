import { cn } from '@/lib/utils/cn';

const VARIANTS = {
  primary: 'bg-primary-strong text-white border border-transparent font-display font-semibold',
  secondary: 'bg-secondary text-ink border border-transparent font-display font-semibold',
  soft: 'bg-surface text-ink border border-transparent font-display font-semibold',
  dark: 'bg-ink text-bg border border-transparent font-display font-semibold',
  ghost: 'bg-transparent text-ink border border-line',
  link: 'bg-transparent text-primary-strong border-none font-semibold !px-0',
};

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-12 px-6 text-[15px]',
};

/**
 * ปุ่มมาตรฐานของทั้งเว็บ
 * variant: primary | secondary | soft | dark | ghost | link
 * size: sm | md | lg
 * active: ใช้กับปุ่มแบบสลับ (เช่น ช้า 0.5x) ให้พื้นเป็นสีเขียวอ่อน
 */
export function Button({ variant = 'primary', size = 'md', active = false, className, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-btn whitespace-nowrap transition-colors duration-150 disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        active && variant === 'ghost' && 'bg-secondary',
        className,
      )}
      {...props}
    />
  );
}
