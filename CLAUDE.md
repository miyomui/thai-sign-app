# CLAUDE.md — กติกาสำหรับ Claude ในโปรเจกต์ thai-sign-app

เว็บแอปเรียนภาษามือไทย ทีมนักศึกษาหลายคนแก้โค้ดพร้อมกัน
ทุกอย่างต้อง **ฟรี** (Supabase free tier, ไม่มี subscription, ไม่ใช้บริการที่ต้องผูกบัตร)

## Stack
- `frontend/` — React 18 + Vite + Tailwind v4, ภาษา **JavaScript (JSX)** ไม่ใช้ TypeScript
- `supabase/` — DB, Auth, Storage (SQL อยู่ใน `supabase/migrations/`)
- AI รันในเบราว์เซอร์: MediaPipe + TensorFlow.js (เทรนใน Google Colab → `ml/`)
- `backend/` — FastAPI ใช้เฉพาะงาน AI ที่ทำในเบราว์เซอร์ไม่ได้
- Avatar 3D: Unity WebGL ฝังผ่าน iframe + postMessage (`frontend/src/features/avatar/`)

## โครงโฟลเดอร์
```
frontend/src/
├─ app/            โครงแอป: routes.jsx, providers.jsx, layout/ (Sidebar, Topbar)  [ไฟล์กลาง]
├─ components/ui/  Button, Chip, Modal, Toast, ProgressBar, Tabs ...              [ไฟล์กลาง]
├─ styles/         tokens.css (สี ฟอนต์ ระยะ), global.css                         [ไฟล์กลาง]
├─ lib/            supabaseClient.js, constants/, utils/                          [ไฟล์กลาง]
└─ features/<ชื่อ>/  งานของแต่ละหน้า/โมดูล
   ├─ README.md     ทำอะไร, เจ้าของ, route, เชื่อมกับใคร
   ├─ index.js      "ประตูหน้าบ้าน" — สิ่งที่ feature อื่น import ได้
   ├─ <Name>Page.jsx
   ├─ components/  api/  hooks/  mock/
```
ใครดูแลอะไร → `docs/OWNERSHIP.md`

## ก่อนแก้ไฟล์ ต้องทำทุกครั้ง
1. ถามผู้ใช้ว่ากำลังทำ feature ไหน แล้วเปิด `docs/OWNERSHIP.md` ดูว่าใครเป็นเจ้าของ
2. แก้เฉพาะไฟล์ใน `features/<feature นั้น>/`
3. ถ้าจำเป็นต้องแก้ **ไฟล์กลาง** หรือ **feature ของคนอื่น** → หยุด บอกผู้ใช้ว่าต้องแจ้งเจ้าของก่อน
   และเสนอทางเลือก (เช่น สร้าง component ไว้ใน feature ตัวเองก่อน แล้วค่อยย้ายเข้า ui/ ทีหลัง)

## กติกา import
- ใช้ alias `@/` แทน `src/` เช่น `import { Button } from '@/components/ui'`
- จาก feature อื่น import ได้ **เฉพาะ** `@/features/<ชื่อ>` (ซึ่งคือ `index.js`)
  - ✅ `import { AvatarStage } from '@/features/avatar'`
  - ❌ `import AvatarStage from '@/features/avatar/components/AvatarStage'`
- สิ่งที่ export ใน `index.js` คือ "สัญญา" กับคนอื่น ห้ามเปลี่ยนชื่อ/พารามิเตอร์โดยไม่แจ้งทีม
- `components/ui/` และ `lib/` ห้าม import อะไรจาก `features/`

## Naming convention
| สิ่ง | รูปแบบ | ตัวอย่าง |
|---|---|---|
| โฟลเดอร์ feature | kebab-case | `sign-ai/` |
| Component | PascalCase.jsx | `VocabCard.jsx` |
| หน้า (route) | `<Name>Page.jsx` | `VocabPage.jsx` |
| Hook | `useXxx.js` | `useVocabList.js` |
| ไฟล์คุย Supabase | `<name>Api.js` | `vocabApi.js` |
| ค่าคงที่ | UPPER_SNAKE_CASE | `CATEGORIES` |
| ตาราง/คอลัมน์ DB | snake_case | `saved_words.vocab_id` |
| รหัสคำศัพท์ | `V` + เลข 3 หลัก | `V001` |
| Branch | `<ประเภท>/<feature>-<สั้นๆ>` | `feat/vocab-search` |
| Commit | Conventional Commits | `feat(vocab): เพิ่มช่องค้นหา` |

## สไตล์และหน้าตา
- **ห้าม hardcode สี** (`#8A9A6E` ฯลฯ) — ใช้คลาสจาก token ใน `styles/tokens.css`
  เช่น `bg-primary-strong`, `bg-secondary`, `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`
- ฟอนต์: หัวข้อ/ปุ่มใช้ `font-display` (Prompt), เนื้อหาใช้ Sarabun (ค่าเริ่มต้น), รหัส/gloss ใช้ `font-mono`
- ใช้ component จาก `components/ui` ก่อนสร้างใหม่
- ข้อความ UI เป็นภาษาไทย, ฟอนต์ ≥ 16px สำหรับเนื้อหา, ปุ่มบนมือถือสูง ≥ 44px
- ผู้ใช้หลักรวมผู้บกพร่องทางการได้ยิน → **ห้ามสื่อสารด้วยเสียงอย่างเดียว** ต้องมีข้อความ/ภาพเสมอ
- ปุ่มต้องเป็น `<button>` หรือ `<Link>` จริง, ปุ่มไอคอนต้องมี `aria-label`, ห้ามใช้สีอย่างเดียวบอกถูก/ผิด

## ข้อมูล
- ทุก feature ต้องทำงานได้แม้ยังไม่ได้ตั้งค่า Supabase: ไฟล์ใน `api/` ให้ fallback ไปใช้ `mock/`
- ชื่อหมวดคำศัพท์อยู่ที่ `lib/constants/categories.js` ที่เดียว
- เปลี่ยนโครงสร้างตาราง = สร้างไฟล์ใหม่ใน `supabase/migrations/` (ห้ามแก้ไฟล์ migration เก่า) และแจ้งทีม

## วิธีเพิ่ม feature ใหม่
1. คัดลอก `frontend/src/features/_template/` → `frontend/src/features/<ชื่อใหม่>/`
2. แก้ `README.md` ของ feature (ทำอะไร, เจ้าของ, route, เชื่อมกับใคร)
3. เพิ่มแถวใน `docs/OWNERSHIP.md` และ `.github/CODEOWNERS`
4. ถ้ามีหน้าใหม่: เพิ่ม route ใน `app/routes.jsx` และเมนูใน `app/layout/navItems.js` (ไฟล์กลาง → แจ้งทีม)
5. ถ้าต้องมีตารางใหม่: สร้างไฟล์ใน `supabase/migrations/` (แจ้งทีม)

## ห้ามทำเด็ดขาด
- ห้าม commit `.env` หรือ key ใดๆ — ใส่เฉพาะชื่อตัวแปรเปล่าๆ ใน `.env.example`
- ห้ามใช้ Supabase `service_role` key ในฝั่ง frontend (ใช้ได้แค่ `anon` key)
- ห้ามแก้ไฟล์ของ feature อื่น หรือไฟล์กลาง โดยไม่แจ้งเจ้าของ
- ห้ามติดตั้ง package/บริการที่เสียเงินหรือต้องใส่บัตรเครดิต
  ก่อน `npm install` ตัวใหม่ทุกครั้ง ให้บอกผู้ใช้: ชื่อ package, license, ขนาด, เหตุผล แล้วรอยืนยัน
- ห้ามใช้ภาพ/ตัวละครที่มีลิขสิทธิ์ (เช่น ตัวการ์ตูนใน wireframe)
- ห้าม push ตรงเข้า `main`, ห้าม `git push --force`
- ห้ามแก้ไฟล์ใน `frontend/public/avatar/` (ของทีม Unity) และ `frontend/public/models/` (ของทีม AI)

## คำสั่งที่ใช้บ่อย
```bash
cd frontend
npm install        # ติดตั้งครั้งแรก
npm run dev        # รันพัฒนา http://localhost:5173
npm run build      # ต้องผ่านก่อนเปิด PR
```
