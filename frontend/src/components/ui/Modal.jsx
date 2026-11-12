import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/cn';

/**
 * หน้าต่างซ้อน — ปิดได้ด้วยปุ่ม Esc หรือคลิกพื้นหลัง
 */
export function Modal({ open, onClose, labelledBy, className, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex max-h-full w-full max-w-[720px] flex-col gap-[18px] overflow-auto rounded-card bg-card p-6 shadow-hover outline-none',
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
