# OWNERSHIP — ใครดูแลโฟลเดอร์ไหน

> แก้ไฟล์ของคนอื่นหรือไฟล์กลาง → แจ้งในกลุ่มทีม + ให้เจ้าของ approve PR ก่อน merge
> เติมชื่อแล้ว อย่าลืมเติม GitHub username ใน `.github/CODEOWNERS` ให้ตรงกันด้วย

## ไฟล์กลาง (ต้องแจ้งทีมทุกครั้ง)

| โฟลเดอร์ | หน้าที่ | เจ้าของหลัก | สำรอง |
|---|---|---|---|
| `frontend/src/app/` | routes, providers, Sidebar, Topbar | ______ | ______ |
| `frontend/src/components/ui/` | ปุ่ม การ์ด chip modal toast ฯลฯ | ______ | ______ |
| `frontend/src/styles/` | design tokens (สี ฟอนต์ ระยะ) | ______ | ______ |
| `frontend/src/lib/` | Supabase client, ค่าคงที่, utils | ______ | ______ |
| `frontend/package.json` | รายการ package | ______ | ______ |
| `supabase/` | schema, seed data | ______ | ______ |
| `CLAUDE.md`, `docs/`, `.github/` | กติกาทีม | ______ | ______ |

## Features (หน้า)

| โฟลเดอร์ | Route | เจ้าของ | สถานะ |
|---|---|---|---|
| `features/home/` | `/` | ______ | UI ตาม design + mock |
| `features/vocab/` | `/vocab` | ______ | UI ตาม design + mock |
| `features/lessons/` | `/lessons`, `/lessons/:lessonId` | ______ | UI ตาม design + mock |
| `features/practice/` | `/practice` | ______ | UI ตาม design + mock |
| `features/ar/` | `/ar` | ______ | placeholder |
| `features/auth/` | — (เมนูผู้ใช้) | ______ | mock login |
| `features/settings/` | `/settings`, `/help` | ______ | placeholder |

## Features (โมดูลใช้ร่วม / จุดเสียบ)

| โฟลเดอร์ | ใช้โดย | เจ้าของ | สถานะ |
|---|---|---|---|
| `features/avatar/` | home, vocab, lessons | ______ | placeholder, รอ Unity build |
| `features/sign-ai/` | practice (อนาคต) | ______ | stub, รอโมเดล |
| `features/quiz/` | practice, lessons | ______ | ใช้งานได้ |
| `features/progress/` | home, vocab, lessons, practice | ______ | localStorage, รอ Supabase |

## ทีมภายนอก / ส่วนอื่น

| โฟลเดอร์ | เจ้าของ | ติดต่อ |
|---|---|---|
| `frontend/public/avatar/` (Unity WebGL build) | ทีม Avatar: ______ | ______ |
| `frontend/public/models/` + `ml/` | ______ | ______ |
| `backend/` (FastAPI) | ______ | ______ |
| ข้อมูลคำศัพท์ (Google Sheet → `supabase/seed.sql`) | ทีมข้อมูล: ______ | ______ |
