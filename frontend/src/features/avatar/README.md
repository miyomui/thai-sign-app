# features/avatar — ตัวแสดงอวตาร 3D (จุดเสียบ Unity WebGL)

**เจ้าของ:** ______ · **Route:** ไม่มี (ใช้ใน home, vocab, lessons)
**ข้อตกลงกับทีม Unity:** [docs/integration/avatar-bridge.md](../../../../docs/integration/avatar-bridge.md)

## ใช้งาน

```jsx
import { AvatarStage, AvatarControls, CameraChips, useAvatarPlayer } from '@/features/avatar';

const player = useAvatarPlayer({ clipId: 'V001' });
<AvatarStage player={player} clipId="V001" className="aspect-video">
  <CameraChips player={player} />
</AvatarStage>
<AvatarControls player={player} />
```

`player` มี: `playing, t (0–100), speed, camLabel, toggle(), replay(), seek(pct), playSegment(from, to),
setSpeed(v), toggleSlow(), setCamera(i), rotateCamera(), currentStep(n), statusText(n)`

## สถานะ

- ยังไม่มี Unity build → แสดงกล่อง placeholder และจำลองเวลาเล่น (UI ทุกปุ่มใช้ได้)
- ทีม Unity วาง build ที่ `frontend/public/avatar/` แล้วตั้ง `VITE_AVATAR_URL=/avatar/index.html` → ใช้ iframe จริงทันที
  ไม่ต้องแก้หน้าอื่น

## โครงไฟล์

| ไฟล์ | ทำอะไร |
|---|---|
| `avatarBridge.js` | ส่ง/รับ postMessage กับ Unity (ตรวจ origin) |
| `hooks/useAvatarPlayer.js` | สถานะการเล่น + คำสั่ง |
| `components/AvatarStage.jsx` | iframe หรือ placeholder |
| `components/AvatarControls.jsx` | แถบควบคุม + ปุ่มมุมกล้อง |
| `config.js` | URL, มุมกล้อง, ความเร็ว |
