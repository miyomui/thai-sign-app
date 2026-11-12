import { cn } from '@/lib/utils/cn';

/** การ์ดพื้นขาว มุมโค้ง มีเงา — as: เปลี่ยน tag ได้ เช่น 'section', 'article' */
export function Card({ as: Tag = 'div', rounded = 'card', className, ...props }) {
  return (
    <Tag
      className={cn('bg-card shadow-card', rounded === 'xl' ? 'rounded-xl-card' : 'rounded-card', className)}
      {...props}
    />
  );
}

/** หัวข้อ section + ลิงก์ด้านขวา (ถ้ามี) */
export function SectionHeader({ title, action, as: H = 'h2', className }) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      <H className="m-0 font-display text-[22px] font-semibold">{title}</H>
      {action}
    </div>
  );
}

/** กล่องข้อความเมื่อไม่มีข้อมูล */
export function EmptyState({ children, className }) {
  return (
    <div className={cn('rounded-card border border-dashed border-line px-6 py-12 text-center text-base text-ink-muted', className)}>
      {children}
    </div>
  );
}

/** หัวหน้า (h1) + ข้อความเล็กข้างๆ */
export function PageTitle({ children, meta }) {
  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <h1 className="m-0 font-display text-[28px] font-semibold">{children}</h1>
      {meta && <span className="text-[15px] text-ink-muted">{meta}</span>}
    </div>
  );
}
