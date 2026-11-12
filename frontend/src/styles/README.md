# styles/ — ไฟล์กลาง

- `tokens.css` — สี ฟอนต์ มุมโค้ง เงา (Tailwind สร้างคลาสให้อัตโนมัติ)
- `global.css` — style พื้นฐาน + utility `stripes-pink` / `stripes-green` สำหรับกล่อง placeholder

## คลาสที่ใช้บ่อย

| ต้องการ | คลาส |
|---|---|
| ปุ่มหลัก (เขียวเข้ม ตัวขาว) | `bg-primary-strong text-white` |
| ปุ่มรอง | `bg-secondary text-ink` |
| chip ชมพู | `bg-surface` |
| ตัวอักษรรอง | `text-ink-muted` |
| เส้นขอบ | `border border-line` |
| การ์ด | `bg-card rounded-card shadow-card` |
| หัวข้อ | `font-display font-semibold` |

**ห้ามเขียนสีเป็นรหัส hex ในไฟล์ feature** ถ้าต้องการสีใหม่ ให้เสนอเพิ่ม token กับทีม
