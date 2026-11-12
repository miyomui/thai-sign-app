/**
 * ข้อมูลคำศัพท์ตัวอย่าง (ใช้เมื่อยังไม่ได้ตั้งค่า Supabase)
 * ลำดับ/รหัสตรงกับ supabase/seed.sql — ถ้าแก้ที่นี่ต้องแก้ seed.sql ด้วย
 */
const RAW = {
  greeting: [
    ['สวัสดี', 'HELLO'], ['ขอบคุณ', 'THANK-YOU'], ['ขอโทษ', 'SORRY'], ['ลาก่อน', 'GOODBYE'],
    ['ใช่', 'YES'], ['ไม่ใช่', 'NO'], ['ไม่เป็นไร', 'NEVER-MIND'], ['ยินดีที่ได้รู้จัก', 'NICE-MEET-YOU'],
    ['ช่วยด้วย', 'HELP'],
  ],
  family: [
    ['พ่อ', 'FATHER'], ['แม่', 'MOTHER'], ['พี่', 'OLDER-SIBLING'], ['น้อง', 'YOUNGER-SIBLING'],
    ['ปู่', 'GRANDFATHER'], ['ย่า', 'GRANDMOTHER'], ['เพื่อน', 'FRIEND'], ['ครู', 'TEACHER'],
  ],
  food: [
    ['ข้าว', 'RICE'], ['น้ำ', 'WATER'], ['กาแฟ', 'COFFEE'], ['ผลไม้', 'FRUIT'],
    ['หิว', 'HUNGRY'], ['อิ่ม', 'FULL'], ['อร่อย', 'DELICIOUS'], ['ราคาเท่าไร', 'HOW-MUCH'],
  ],
  time: [
    ['วันนี้', 'TODAY'], ['พรุ่งนี้', 'TOMORROW'], ['เมื่อวาน', 'YESTERDAY'], ['หนึ่ง', 'ONE'],
    ['สอง', 'TWO'], ['สาม', 'THREE'], ['สี่', 'FOUR'], ['ห้า', 'FIVE'], ['ชั่วโมง', 'HOUR'],
  ],
  travel: [
    ['บ้าน', 'HOME'], ['โรงเรียน', 'SCHOOL'], ['โรงพยาบาล', 'HOSPITAL'], ['ตลาด', 'MARKET'],
    ['ห้องน้ำ', 'TOILET'], ['รถเมล์', 'BUS'], ['ไป', 'GO'], ['มา', 'COME'],
  ],
  emotion: [],
};

let n = 0;
/** @type {{id:string, th:string, gloss:string, categoryId:string, facialExpression:string|null}[]} */
export const MOCK_WORDS = Object.entries(RAW).flatMap(([categoryId, words]) =>
  words.map(([th, gloss]) => ({
    id: `V${String(++n).padStart(3, '0')}`,
    th,
    gloss,
    categoryId,
    facialExpression: null,
  })),
);
