import { isSupabaseReady, supabase } from '@/lib/supabaseClient';
import { MOCK_WORDS } from '../mock/vocab';

/** แปลงแถวจากตาราง vocab (snake_case) → object ที่ใช้ในเว็บ (camelCase) */
function fromRow(row) {
  return {
    id: row.vocab_id,
    th: row.thai_text,
    gloss: row.thsl_gloss,
    categoryId: row.category_id,
    facialExpression: row.facial_expression,
  };
}

/** โหลดคำศัพท์ทั้งหมด — ถ้ายังไม่ตั้งค่า Supabase จะคืนข้อมูล mock */
export async function fetchAllWords() {
  if (!isSupabaseReady) return MOCK_WORDS;
  const { data, error } = await supabase
    .from('vocab')
    .select('vocab_id, thai_text, thsl_gloss, category_id, facial_expression')
    .order('vocab_id');
  if (error) throw error;
  return data.map(fromRow);
}
