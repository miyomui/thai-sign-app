import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { useAuth } from '../hooks/useAuth';

const itemClass =
  'flex min-h-11 w-full items-center rounded-[10px] px-3 text-left text-[15px] text-ink no-underline hover:bg-surface';

/** ปุ่มวงกลมมุมขวาบน + เมนูผู้ใช้ */
export function UserMenu() {
  const { user, loggedIn, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="เมนูผู้ใช้"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="size-10 rounded-full border-none bg-secondary font-display text-[15px] font-semibold text-ink"
      >
        {loggedIn ? user.name.slice(0, 1) : '?'}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-30 flex w-56 flex-col gap-0.5 rounded-card border border-line bg-card p-2 shadow-hover"
        >
          {loggedIn ? (
            <>
              <div className="px-3 py-2 font-display text-sm font-semibold">{user.name}</div>
              <Link role="menuitem" to={ROUTES.settings} className={itemClass} onClick={close}>
                โปรไฟล์
              </Link>
              <Link role="menuitem" to={`${ROUTES.home}#saved`} className={itemClass} onClick={close}>
                คำศัพท์ที่บันทึก
              </Link>
              <Link role="menuitem" to={ROUTES.lessons} className={itemClass} onClick={close}>
                ผลการเรียน
              </Link>
              <button role="menuitem" type="button" className={`${itemClass} border-none bg-transparent`} onClick={() => { close(); logout(); }}>
                ออกจากระบบ
              </button>
            </>
          ) : (
            <button role="menuitem" type="button" className={`${itemClass} border-none bg-transparent`} onClick={() => { close(); login(); }}>
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
