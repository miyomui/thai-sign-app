import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils/cn';
import { NAV_ITEMS, UTIL_NAV_ITEMS } from './navItems';

/** เมนูซ้าย — กว้าง 240px, ย่อเหลือ 72px (แสดงเฉพาะไอคอน) */
export function Sidebar({ collapsed, onToggle }) {
  const open = !collapsed;
  return (
    <nav
      aria-label="เมนูหลัก"
      className={cn(
        'sticky top-0 z-30 flex h-screen flex-none flex-col gap-2 border-r border-line bg-bg px-3 py-4 transition-[width] duration-250 ease-out',
        open ? 'w-60' : 'w-[72px]',
      )}
    >
      <div className="mb-4 flex items-center justify-center gap-2">
        {open && (
          <div className="flex h-10 flex-1 items-center justify-center rounded-full bg-surface font-mono text-xs font-medium tracking-[.08em]">
            LOGO
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label="พับหรือขยายเมนู"
          aria-expanded={open}
          className="size-10 flex-none rounded-btn border border-line bg-card text-lg leading-none text-ink"
        >
          {open ? '‹' : '›'}
        </button>
      </div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          title={item.label}
          className={({ isActive }) =>
            cn(
              'flex h-12 items-center gap-3 rounded-btn border-l-4 px-3 font-display text-[15px] no-underline transition-colors duration-150 ease-out',
              open ? 'justify-start' : 'justify-center',
              isActive
                ? 'border-accent bg-primary-strong font-semibold !text-white'
                : 'border-transparent bg-secondary font-medium !text-ink hover:brightness-95',
            )
          }
        >
          <span aria-hidden="true" className="w-5 text-center text-base">
            {item.icon}
          </span>
          {open ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}
        </NavLink>
      ))}

      <div className="flex-1" />
      <div className="mx-2 my-1 h-px bg-line" />

      {UTIL_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          title={item.label}
          className={({ isActive }) =>
            cn(
              'flex h-11 items-center gap-3 rounded-btn px-4 font-display text-sm no-underline hover:bg-secondary/30',
              open ? 'justify-start' : 'justify-center',
              isActive ? 'bg-secondary/30 !text-ink' : '!text-ink-muted',
            )
          }
        >
          <span aria-hidden="true" className="w-5 text-center">
            {item.icon}
          </span>
          {open ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}
