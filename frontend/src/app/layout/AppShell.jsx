import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppProviders } from '../providers';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const AUTO_COLLAPSE_WIDTH = 820;

/** โครงทุกหน้า: Sidebar ซ้าย + Topbar + เนื้อหา (<Outlet/>) */
export function AppShell() {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < AUTO_COLLAPSE_WIDTH);
  const { pathname, hash } = useLocation();

  // จอแคบ → ย่อเมนูอัตโนมัติ
  useEffect(() => {
    const onResize = () => window.innerWidth < AUTO_COLLAPSE_WIDTH && setCollapsed(true);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // เปลี่ยนหน้า → เลื่อนขึ้นบนสุด (หรือไปที่ #anchor)
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <AppProviders>
      <div className="flex min-h-screen bg-bg text-ink">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="mx-auto w-full max-w-[1120px] flex-1 px-4 pb-16 pt-7 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AppProviders>
  );
}
