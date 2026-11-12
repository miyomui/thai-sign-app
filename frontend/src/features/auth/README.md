# features/auth — เข้าสู่ระบบ / เมนูผู้ใช้

**เจ้าของ:** ______ · **Route:** ไม่มี (เมนูมุมขวาบนของ Topbar)

- ยังไม่ตั้งค่า Supabase → ใช้ผู้ใช้จำลองชื่อ "กานต์" (กดออกจากระบบ/เข้าสู่ระบบได้)
- ตั้งค่าแล้ว → login ด้วย Google OAuth ของ Supabase (ฟรี) ต้องเปิดใน Supabase → Authentication → Providers

## ให้ feature อื่นใช้

- `useAuth()` → `{ user: { id, name } | null, loggedIn, login(), logout() }`
- `UserMenu` (ใช้ใน `app/layout/Topbar.jsx`)
