# supabase/ — ฐานข้อมูล (ไฟล์กลาง)

| ไฟล์ | ทำอะไร |
|---|---|
| `migrations/*.sql` | สร้าง/แก้ตาราง เรียงตามวันที่ในชื่อไฟล์ |
| `seed.sql` | ข้อมูลหมวดและคำศัพท์ V001–V042 (ตรงกับ `frontend/src/features/vocab/mock/vocab.js`) |

## ตั้งค่าครั้งแรก (ไม่ต้องติดตั้งอะไร)

1. สร้างโปรเจกต์ฟรีที่ supabase.com
2. เปิด **SQL Editor** → วางเนื้อหา `migrations/20261112000000_init.sql` → Run
3. วางเนื้อหา `seed.sql` → Run
4. Project Settings → API → คัดลอก `Project URL` และ `anon public` key ไปใส่ `frontend/.env`
   (**ห้ามใช้ `service_role` key ในเว็บ**)

## กติกา

- เปลี่ยนโครงสร้าง → สร้างไฟล์ใหม่ เช่น `migrations/20261120000000_add_sentences.sql` ห้ามแก้ไฟล์เก่า
- ทุกตารางต้องเปิด Row Level Security
- แจ้งทีมทุกครั้งที่เพิ่ม migration
- ข้อมูลคำศัพท์จริงมาจาก Google Sheet ของทีมข้อมูล → อัปเดต `seed.sql`
