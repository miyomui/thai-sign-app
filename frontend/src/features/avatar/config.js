/** URL ของ Unity WebGL build (ตั้งใน .env) — ว่าง = แสดง placeholder */
export const AVATAR_URL = import.meta.env.VITE_AVATAR_URL || '';

/** มุมกล้องที่ Unity รองรับ (ต้องตรงกับ docs/integration/avatar-bridge.md) */
export const CAMERAS = [
  { id: 'front', label: 'มุมหน้า' },
  { id: 'side', label: 'ข้าง' },
  { id: 'hands', label: 'ซูมมือ' },
];

export const SPEEDS = [0.5, 1];
