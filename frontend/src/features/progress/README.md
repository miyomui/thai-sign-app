# features/progress — ระบบความก้าวหน้า (ใช้ร่วม)

**เจ้าของ:** ______ · **Route:** ไม่มี (เป็นโมดูลให้หน้าอื่นใช้)

เก็บคำที่บันทึก (♥), คำที่เรียนแล้ว (★), ผลแบบทดสอบ

## ใช้งาน

```js
import { useProgress } from '@/features/progress';
const { isSaved, toggleSave, isLearned, markLearned, recordQuizResult } = useProgress();
```

## สถานะ

- ตอนนี้เก็บใน **localStorage** (`api/progressStore.js`) มีข้อมูลเดโมเริ่มต้นตาม design
- ขั้นต่อไป: ซิงก์กับ Supabase ตาราง `saved_words`, `learning_progress`, `quiz_attempts`
  (มีใน `supabase/migrations/`) เมื่อผู้ใช้ login — แก้เฉพาะ `api/` ส่วน hook และหน้าอื่นไม่ต้องเปลี่ยน

## ใช้โดย

home, vocab, lessons, practice
