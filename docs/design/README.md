# Design specs

spec ของแต่ละหน้า คัดลอกมาจากโปรเจกต์ design "Thai sign language app mockups"
(ไฟล์ต้นฉบับอยู่ใน Claude Design ของทีม)

| ไฟล์ | หน้า | Feature |
|---|---|---|
| [home.md](home.md) | หน้าแรก | `features/home/` |
| [vocab.md](vocab.md) | คำศัพท์ | `features/vocab/` |
| [lessons.md](lessons.md) | บทเรียน | `features/lessons/` |
| [practice.md](practice.md) | ฝึกทบทวน | `features/practice/` |

## ข้อตกลงที่ใช้จริงในโค้ด (เมื่อ spec ขัดกันเอง)

- **ชื่อตัวแปรสี:** spec แต่ละหน้าตั้งชื่อต่างกัน (`--primary` / `--color-primary`) โค้ดใช้ชุดเดียวใน
  `frontend/src/styles/tokens.css` — ตัวอักษรหลักชื่อ `ink` (`text-ink`), ข้อความรอง `ink-muted`, เส้นขอบ `line`
- **ปุ่มหลักตัวอักษรขาว** ใช้ `primary-strong` (#5E6E47) เพื่อให้ผ่าน contrast ตาม spec หน้าแรก
- **เมนู active:** เขียวเข้ม + แถบชมพูซ้าย (ค่าเริ่มต้นใน design)
- **Sidebar** กว้าง 240px, ย่อเหลือ 72px, ย่ออัตโนมัติเมื่อจอแคบกว่า 820px
