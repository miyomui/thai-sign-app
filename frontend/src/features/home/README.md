# features/home — หน้าแรก

**เจ้าของ:** ______ · **Route:** `/` · **Spec:** [docs/design/home.md](../../../../docs/design/home.md)

## ส่วนประกอบ (เรียงจากบนลงล่าง)

| Component | ทำอะไร |
|---|---|
| `components/Greeting.jsx` | "สวัสดี, ชื่อ" + แถบความก้าวหน้า / ปุ่มเข้าสู่ระบบ |
| `components/FeaturedWordCard.jsx` | การ์ดคำแนะนำวันนี้: อวตาร, มุมกล้อง, ควบคุมการเล่น, สุ่มคำ/คำถัดไป, ♥ |
| `components/WordInfoTabs.jsx` | 4 แท็บ: รายละเอียด / ขั้นตอนการทำท่า / ตัวอย่างการใช้ / คำที่เกี่ยวข้อง |
| `components/CategoryGrid.jsx` | การ์ดหมวด → ไปหน้าคำศัพท์ `?cat=` |
| `components/SavedWords.jsx` | คำที่บันทึก (anchor `#saved`) |
| `mock/featured.js` | ขั้นตอนท่า, หมายเหตุ, ประโยคตัวอย่าง (ตัวอย่าง — ต้องตรวจกับผู้เชี่ยวชาญ) |

## เชื่อมกับ

avatar (อวตาร), vocab (คำศัพท์, หน้าต่างรายละเอียด), progress (♥ ★ ความก้าวหน้า), auth (ชื่อผู้ใช้), ar (ปุ่มดูแบบ AR)
