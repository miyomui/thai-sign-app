import { ROUTES } from '@/lib/constants/routes';

/** เมนูหลักใน Sidebar (ไฟล์กลาง — เพิ่มหน้าใหม่ต้องแจ้งทีม) */
export const NAV_ITEMS = [
  { to: ROUTES.home, label: 'หน้าแรก', icon: '▣', end: true },
  { to: ROUTES.vocab, label: 'คำศัพท์', icon: '◫' },
  { to: ROUTES.lessons, label: 'บทเรียน', icon: '▤' },
  { to: ROUTES.practice, label: 'ฝึกทบทวน', icon: '✎' },
  { to: ROUTES.ar, label: 'AR โหมด', icon: '◉' },
];

/** เมนูล่างสุด */
export const UTIL_NAV_ITEMS = [
  { to: ROUTES.settings, label: 'ตั้งค่า', icon: '⚙' },
  { to: ROUTES.help, label: 'ช่วยเหลือ', icon: '?' },
];
