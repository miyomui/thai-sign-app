# ข้อตกลงการเชื่อมต่อ Avatar 3D (Unity WebGL ↔ เว็บ)

โค้ดฝั่งเว็บอยู่ที่ `frontend/src/features/avatar/` (ไฟล์หลัก `avatarBridge.js`)

## การฝัง

- ทีม Unity build แบบ **WebGL** แล้ววางทั้งโฟลเดอร์ไว้ที่ `frontend/public/avatar/`
  (ต้องมี `frontend/public/avatar/index.html`)
- ตั้ง `VITE_AVATAR_URL=/avatar/index.html` ใน `frontend/.env`
- ถ้ายังไม่ตั้งค่า เว็บจะแสดงกล่อง placeholder แทน (ทุกหน้ายังใช้งานได้)
- ⚠️ GitHub รับไฟล์ไม่เกิน 100MB ต่อไฟล์ ถ้า build ใหญ่กว่านั้น ให้เปิด compression (Brotli/Gzip)
  ใน Unity หรือโฮสต์ build แยกบน GitHub Pages / Netlify (ฟรี) แล้วใส่ URL เต็มใน `VITE_AVATAR_URL`

## รูปแบบข้อความ

ทุกข้อความเป็น object: `{ source, type, payload }`

### เว็บ → Unity (`source: "thai-sign-app"`)

| type | payload | ความหมาย |
|---|---|---|
| `PLAY_SIGN` | `{ clipId: "V001", speed: 1 }` | เล่นท่าของคำนั้นตั้งแต่ต้น |
| `PLAY_SEGMENT` | `{ clipId, from: 0.25, to: 0.5 }` | เล่นเฉพาะช่วง (0–1) ใช้กับ "ขั้นตอนการทำท่า" |
| `PAUSE` | `{}` | หยุดชั่วคราว |
| `RESUME` | `{}` | เล่นต่อ |
| `SEEK` | `{ progress: 0.4 }` | กระโดดไปตำแหน่ง (0–1) |
| `SET_SPEED` | `{ speed: 0.5 }` | ความเร็ว 0.5 หรือ 1 |
| `SET_CAMERA` | `{ camera: "front" \| "side" \| "hands" }` | มุมกล้อง |

### Unity → เว็บ (`source: "unity-avatar"`)

| type | payload | ความหมาย |
|---|---|---|
| `READY` | `{ version: "1.0.0" }` | โหลดเสร็จ พร้อมรับคำสั่ง |
| `PROGRESS` | `{ progress: 0.42 }` | ตำแหน่งปัจจุบัน (ส่งประมาณ 10 ครั้ง/วินาที) |
| `CLIP_ENDED` | `{ clipId }` | เล่นจบ |
| `ERROR` | `{ code, message }` | เช่น `CLIP_NOT_FOUND` |

## ตัวอย่างฝั่ง Unity (C# + .jslib)

ใน Unity ให้สร้าง `Assets/Plugins/WebGL/Bridge.jslib` สำหรับส่งข้อความกลับ:

```js
mergeInto(LibraryManager.library, {
  SendToWeb: function (jsonPtr) {
    window.parent.postMessage(JSON.parse(UTF8ToString(jsonPtr)), '*');
  },
});
```

และใน `index.html` ของ WebGL build ให้รับข้อความแล้วส่งเข้า Unity:

```js
window.addEventListener('message', (e) => {
  if (e.data?.source !== 'thai-sign-app') return;
  unityInstance.SendMessage('AvatarController', 'OnWebMessage', JSON.stringify(e.data));
});
```

## ชื่อคลิป

ตั้งชื่อคลิป/animation ตาม `vocab_id` เช่น `V001` (สวัสดี) — ดูรายการทั้งหมดใน `supabase/seed.sql`
