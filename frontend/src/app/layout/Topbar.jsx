import { UserMenu } from '@/features/auth';
import { SearchBox } from './SearchBox';

/** แถบบน: ช่องค้นหา + เมนูผู้ใช้ */
export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-bg/95 px-4 backdrop-blur-sm sm:px-6">
      <SearchBox />
      <div className="flex-1" />
      <UserMenu />
    </header>
  );
}
