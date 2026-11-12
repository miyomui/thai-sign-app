/**
 * รายการบทเรียนตัวอย่าง (ตาม spec บทเรียน ข้อ 2.2)
 * categoryId = หมวดคำศัพท์ที่ใช้เป็นเนื้อหาของบท (ชั่วคราว จนกว่าจะมีตาราง lesson_vocab)
 * percent = ความก้าวหน้าตัวอย่าง
 * TODO(lessons): โหลดจากตาราง lessons + lesson_vocab และคำนวณ % จาก progress
 */
export const LESSONS = [
  { id: '01', title: 'การทักทาย', tag: 'การทักทาย', categoryId: 'greeting', percent: 80 },
  { id: '02', title: 'ครอบครัว', tag: 'ครอบครัว', categoryId: 'family', percent: 40 },
  { id: '03', title: 'อาหารและเครื่องดื่ม', tag: 'อาหาร', categoryId: 'food', percent: 100 },
  { id: '04', title: 'โรงเรียน/การเรียน', tag: 'โรงเรียน', categoryId: 'travel', percent: 0 },
  { id: '05', title: 'การเดินทาง', tag: 'การเดินทาง', categoryId: 'travel', percent: 10 },
  { id: '06', title: 'การขอความช่วยเหลือ', tag: 'ขอความช่วยเหลือ', categoryId: 'greeting', percent: 0 },
];

export const EXERCISES = [
  { id: 'recall', title: 'ฝึกจำท่าทาง', desc: 'ดูอวตารทำท่า แล้วเลือกคำตอบที่ถูกต้องจาก 4 ตัวเลือก', from: 'การทักทาย', count: 5 },
  {
    id: 'match-image',
    title: 'ดูคำแล้วเลือกภาพ',
    desc: 'อ่านหรือฟังคำศัพท์ แล้วเลือกภาพท่ามือที่ตรงกัน มีข้อความแทนเสียงเสมอ',
    from: 'ครอบครัว',
    count: 5,
  },
  { id: 'order', title: 'เรียงลำดับท่าทาง', desc: 'ลากเรียงขั้นตอนของท่า หรือคำในประโยคให้ถูกลำดับ', from: 'อาหารและเครื่องดื่ม', count: 5 },
];

export function findLesson(id) {
  return LESSONS.find((l) => l.id === id);
}
