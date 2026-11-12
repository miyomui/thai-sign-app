# ข้อตกลงโมเดล AI ตรวจจับท่ามือ

โค้ดฝั่งเว็บ: `frontend/src/features/sign-ai/` · งานเทรน: `ml/`

## ภาพรวม

```
กล้อง → MediaPipe Hand Landmarker (ในเบราว์เซอร์) → จุด landmark 21 จุด/มือ
      → TensorFlow.js classifier (เทรนใน Colab) → { vocabId, confidence }
```

## Input ของโมเดล

- ลำดับเฟรม `T = 30` เฟรม (ประมาณ 1 วินาที)
- ต่อเฟรม: 2 มือ × 21 จุด × (x, y, z) = **126 ค่า** (มือไหนไม่เจอให้เติม 0)
- normalize: ลบด้วยตำแหน่งข้อมือ (จุดที่ 0) ของแต่ละมือ
- shape: `[1, 30, 126]` (float32)

## Output ของโมเดล

- softmax ขนาด `N` คลาส เรียงตามไฟล์ `labels.json` เช่น `["V001", "V002", ...]`

## ไฟล์ที่ต้องส่งมอบ (วางใน `frontend/public/models/sign-v<เวอร์ชัน>/`)

```
model.json
group1-shard1of1.bin
labels.json
```

แล้วแก้ `MODEL_URL` ใน `frontend/src/features/sign-ai/config.js`

## Export จาก Colab

```python
!pip install tensorflowjs
import tensorflowjs as tfjs
tfjs.converters.save_keras_model(model, 'sign-v1')
```

## ฟังก์ชันที่ feature อื่นเรียกใช้ (ห้ามเปลี่ยนรูปแบบโดยไม่แจ้งทีม)

```js
import { useSignRecognizer } from '@/features/sign-ai';
const { start, stop, result, status } = useSignRecognizer({ videoRef });
// result = { vocabId: 'V001', confidence: 0.92 } | null
```
