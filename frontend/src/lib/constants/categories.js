/**
 * หมวดคำศัพท์ — แหล่งเดียวของทั้งเว็บ (ต้องตรงกับตาราง categories ใน Supabase)
 * chipClass: สีพื้นของ chip หมวด ตาม spec หน้าคำศัพท์ ข้อ 5.5
 */
export const CATEGORIES = [
  { id: 'greeting', name: 'คำทักทายและคำพื้นฐาน', short: 'การทักทาย', chipClass: 'bg-secondary' },
  { id: 'family', name: 'บุคคลและครอบครัว', short: 'ครอบครัว', chipClass: 'bg-surface' },
  { id: 'food', name: 'อาหารและเครื่องดื่ม', short: 'อาหาร', chipClass: 'bg-accent/40' },
  { id: 'time', name: 'เวลาและตัวเลข', short: 'เวลา/ตัวเลข', chipClass: 'bg-primary/40' },
  { id: 'travel', name: 'สถานที่และการเดินทาง', short: 'การเดินทาง', chipClass: 'bg-secondary/60' },
  { id: 'emotion', name: 'อารมณ์และความรู้สึก', short: 'อารมณ์', chipClass: 'bg-surface' },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}
