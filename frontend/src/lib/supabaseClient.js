import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** true เมื่อใส่ค่า Supabase ใน .env แล้ว — ถ้า false ให้ api/ ใช้ข้อมูล mock */
export const isSupabaseReady = Boolean(url && anonKey);

/** Supabase client (เป็น null ถ้ายังไม่ได้ตั้งค่า) — ใช้ anon key เท่านั้น */
export const supabase = isSupabaseReady ? createClient(url, anonKey) : null;
