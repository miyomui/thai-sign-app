# lib/ — ไฟล์กลาง

| ไฟล์ | ทำอะไร |
|---|---|
| `supabaseClient.js` | `supabase` client + `isSupabaseReady` (false = ยังไม่ตั้งค่า .env → ใช้ mock) |
| `constants/categories.js` | หมวดคำศัพท์ 6 หมวด (แหล่งเดียวของทั้งเว็บ) |
| `constants/routes.js` | path ของทุกหน้า |
| `utils/cn.js` | รวมชื่อคลาส CSS |

กติกา: ไฟล์ใน `lib/` ห้าม import อะไรจาก `features/` และแก้ได้เมื่อแจ้งทีมแล้วเท่านั้น
