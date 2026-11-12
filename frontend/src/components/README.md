# components/ui/ — ไฟล์กลาง

ชิ้นส่วน UI ที่ทุกหน้าใช้ร่วมกัน import จาก `@/components/ui`

| Component | ใช้ทำอะไร |
|---|---|
| `Button` | ปุ่มทั่วไป `variant`: primary / secondary / soft / dark / ghost / link |
| `IconButton` | ปุ่มกลมมีแค่ไอคอน (ต้องใส่ `label`) |
| `HeartButton` | ปุ่มหัวใจบันทึกคำ |
| `FilterChip`, `ChipRow`, `Tag` | chip ตัวกรอง, แถว chip เลื่อนได้, ป้ายข้อมูล |
| `ProgressBar` | แถบความก้าวหน้า 0–100 |
| `Modal` | หน้าต่างซ้อน (ปิดด้วย Esc ได้) |
| `useToast` | ข้อความแจ้งเตือนสั้นด้านล่าง `toast('บันทึกแล้ว')` |
| `Tabs`, `TabPanel` | แท็บ |
| `Placeholder` | กล่องลายทางแทนภาพ/วิดีโอที่ยังไม่มี |
| `Card`, `SectionHeader`, `EmptyState`, `PageTitle` | โครงการ์ด/หัวข้อ |

กติกา: component ที่นี่ต้องไม่รู้จัก feature ใดๆ (ห้าม import จาก `features/`)
ถ้าจะเพิ่ม/แก้ → แจ้งทีมก่อน เพราะกระทบทุกหน้า
