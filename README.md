# thai-sign-app — เว็บแอปเรียนภาษามือไทย

เรียนคำศัพท์ภาษามือไทยผ่านอวตาร 3 มิติ (Unity WebGL), แบบฝึกหัด, และ AR
ใช้เครื่องมือฟรีทั้งหมด: React + Vite + Tailwind, Supabase (free tier), MediaPipe + TensorFlow.js

> **ก่อนแก้โค้ด อ่าน [CLAUDE.md](CLAUDE.md) และ [docs/OWNERSHIP.md](docs/OWNERSHIP.md) ก่อนเสมอ**

## เริ่มต้นใช้งาน

```bash
cd frontend
npm install
cp .env.example .env   # ใส่ค่า Supabase ของทีม (ถ้ายังไม่มี แอปจะใช้ข้อมูล mock)
npm run dev            # เปิด http://localhost:5173
```

## โครงโปรเจกต์ (ย่อ)

```
thai-sign-app/
├─ CLAUDE.md              กติกาทีม (สำหรับคนและ Claude)
├─ docs/                  OWNERSHIP, spec จาก design, ข้อตกลงการเชื่อมต่อ
├─ frontend/              เว็บแอป React
│  ├─ public/avatar/      ← ทีม Unity วาง WebGL build
│  ├─ public/models/      ← โมเดล TF.js จาก Colab
│  └─ src/
│     ├─ app/             โครงแอป: routes, Sidebar, Topbar        (ไฟล์กลาง)
│     ├─ components/ui/   ปุ่ม การ์ด chip modal ฯลฯ                (ไฟล์กลาง)
│     ├─ styles/          design tokens (สี ฟอนต์ ระยะ)            (ไฟล์กลาง)
│     ├─ lib/             Supabase client, ค่าคงที่                 (ไฟล์กลาง)
│     └─ features/        ← งานของแต่ละหน้า แก้ที่นี่เป็นหลัก
├─ supabase/              SQL สร้างตาราง + ข้อมูลคำศัพท์
├─ backend/               FastAPI (ใช้เมื่อจำเป็นเท่านั้น)
└─ ml/                    งานเทรน AI ใน Google Colab
```

## อยากแก้หน้า... ไปที่ไหน?

| อยากแก้ | ไปที่ |
|---|---|
| หน้าแรก | `frontend/src/features/home/` |
| หน้าคำศัพท์ / หน้าต่างรายละเอียดคำ | `frontend/src/features/vocab/` |
| บทเรียน / flashcard | `frontend/src/features/lessons/` |
| ฝึกทบทวน | `frontend/src/features/practice/` |
| AR โหมด | `frontend/src/features/ar/` |
| ตัวแสดงอวตาร 3D | `frontend/src/features/avatar/` |
| AI ตรวจท่ามือ | `frontend/src/features/sign-ai/` + `ml/` |
| แบบทดสอบ (ใช้ร่วม) | `frontend/src/features/quiz/` |
| คำที่บันทึก / ความก้าวหน้า | `frontend/src/features/progress/` |
| เข้าสู่ระบบ / เมนูผู้ใช้ | `frontend/src/features/auth/` |
| เมนูซ้าย / แถบบน / สีทั้งเว็บ | ไฟล์กลาง → **แจ้งทีมก่อน** |

## เอกสารเพิ่มเติม

- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — วิธีใช้ git ในทีม
- [docs/integration/avatar-bridge.md](docs/integration/avatar-bridge.md) — ข้อตกลงกับทีม Unity
- [docs/integration/sign-ai-model.md](docs/integration/sign-ai-model.md) — รูปแบบโมเดล AI
- [docs/design/](docs/design/) — spec ของแต่ละหน้าจาก design
