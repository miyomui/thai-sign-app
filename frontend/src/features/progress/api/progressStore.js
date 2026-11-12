/**
 * ที่เก็บความก้าวหน้า — ตอนนี้ใช้ localStorage ของเบราว์เซอร์
 * TODO(progress): เมื่อมีระบบ login ให้ซิงก์กับตาราง saved_words / learning_progress / quiz_attempts ใน Supabase
 */
const KEY = 'thai-sign-app:progress:v1';

// ค่าเริ่มต้นสำหรับเดโม (ตรงกับ design) — ลบออกเมื่อต่อ Supabase แล้ว
const DEMO_STATE = {
  savedIds: ['V001', 'V002', 'V011', 'V019'],
  learnedIds: ['V001', 'V002', 'V004', 'V005', 'V010', 'V011', 'V018', 'V019', 'V020', 'V026', 'V027', 'V035'],
  quizAttempts: [],
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEMO_STATE, ...JSON.parse(raw) };
  } catch {
    // localStorage ใช้ไม่ได้ (เช่น private mode) → ใช้ค่าเริ่มต้น
  }
  return DEMO_STATE;
}

export function saveProgress(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ไม่เป็นไร ข้อมูลจะหายเมื่อรีเฟรช
  }
}
