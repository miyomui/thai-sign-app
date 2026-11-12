import { cn } from '@/lib/utils/cn';

/**
 * Chip แบบกดได้ (ใช้เป็นตัวกรองหมวด)
 * active = เลือกอยู่ → พื้นเขียวเสจ ตัวหนา
 */
export function FilterChip({ active, className, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'h-11 flex-none whitespace-nowrap rounded-full border px-4 text-sm text-ink',
        active ? 'border-primary bg-primary font-semibold' : 'border-transparent bg-surface font-medium',
        className,
      )}
      {...props}
    />
  );
}

/** ป้ายเล็กแสดงข้อมูล (ไม่ใช่ปุ่ม) — ส่งสีพื้นผ่าน className หรือ style */
export function Tag({ className, ...props }) {
  return <span className={cn('inline-block rounded-full px-3 py-1 text-[13px]', className)} {...props} />;
}

/** แถว chip ที่เลื่อนแนวนอนได้ */
export function ChipRow({ className, ...props }) {
  return <div className={cn('flex gap-2 overflow-x-auto pb-1', className)} {...props} />;
}
