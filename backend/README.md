# backend/ — FastAPI (ใช้เมื่อจำเป็นเท่านั้น)

แอปหลักรัน AI ในเบราว์เซอร์ (MediaPipe + TensorFlow.js) และใช้ Supabase เป็น backend อยู่แล้ว
โฟลเดอร์นี้มีไว้สำหรับงานที่ **ทำในเบราว์เซอร์ไม่ได้** เช่น ประมวลผลวิดีโอหนักๆ หรือโมเดล Python ที่แปลงเป็น TF.js ไม่ได้

## รันในเครื่อง

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

เปิด http://localhost:8000/docs เพื่อดู API

## โฮสต์ฟรี

ตัวเลือกที่มี free tier: Render, Hugging Face Spaces (Docker) — ห้ามใช้แพ็กเกจที่ต้องผูกบัตร

## กติกา

- ห้ามเก็บ Supabase `service_role` key ในโค้ด ใช้ตัวแปรแวดล้อม (`.env`) เท่านั้น
- เพิ่ม endpoint ใหม่ใน `app/routers/` และบันทึกไว้ในตารางด้านล่าง

| Endpoint | ทำอะไร | ผู้ดูแล |
|---|---|---|
| `GET /health` | เช็กว่าเซิร์ฟเวอร์ทำงาน | ______ |
