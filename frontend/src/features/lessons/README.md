# features/lessons — บทเรียน

**เจ้าของ:** ______ · **Route:** `/lessons`, `/lessons/:lessonId` · **Spec:** [docs/design/lessons.md](../../../../docs/design/lessons.md)

## หน้า

| ไฟล์ | Route | ทำอะไร |
|---|---|---|
| `LessonsPage.jsx` | `/lessons` | chip กรอง, การ์ดบทเรียน 6 บท, แบบฝึกหัดแนะนำ |
| `LessonFlashcardPage.jsx` | `/lessons/01` | เรียนทีละคำ (จำได้แล้ว / ยังไม่แน่ใจ) → หน้าจบบท |

## Components

`LessonCard` (สถานะ: ยังไม่เริ่ม / กำลังเรียน / เรียนจบแล้ว), `ExerciseCard`

## ข้อมูล

`mock/lessons.js` — ตอนนี้แต่ละบทใช้คำจากหมวดคำศัพท์ 1 หมวด (ชั่วคราว)
TODO: ตาราง `lessons` + `lesson_vocab` ใน Supabase และคำนวณ % จาก progress

## เชื่อมกับ

avatar, vocab, progress (`markLearned` เมื่อจบบท), quiz (`ResultPanel`), practice (ปุ่มทำแบบฝึกหัด)
