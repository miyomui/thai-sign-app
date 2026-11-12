# features/sign-ai — AI ตรวจจับท่ามือ (จุดเสียบ)

**เจ้าของ:** ______ · **Route:** ไม่มี (อนาคต: โหมด "ทำท่าให้กล้องดู" ในหน้าฝึกทบทวน)
**ข้อตกลงโมเดล:** [docs/integration/sign-ai-model.md](../../../../docs/integration/sign-ai-model.md) · **งานเทรน:** `ml/`

## สถานะ

stub — `useSignRecognizer()` คืน `status: 'not-ready'` จนกว่าจะมีโมเดล
ยังไม่ได้ติดตั้ง MediaPipe/TF.js เพื่อไม่ให้แอปหนักโดยไม่จำเป็น

## ใช้งาน (เมื่อพร้อม)

```js
import { useSignRecognizer, MIN_CONFIDENCE } from '@/features/sign-ai';
const { start, stop, status, result } = useSignRecognizer({ videoRef });
if (result?.confidence >= MIN_CONFIDENCE) { /* result.vocabId */ }
```

## ขั้นตอนต่อ

1. ทีม AI วางโมเดลใน `frontend/public/models/sign-v1/`
2. ขออนุมัติทีมเพิ่ม package `@mediapipe/tasks-vision`, `@tensorflow/tfjs`
3. เขียนจริงใน `hooks/useSignRecognizer.js` (ทำตาม TODO ในไฟล์)
