# วิธีทำงานร่วมกันด้วย Git

## ขั้นตอนทุกครั้งที่เริ่มงาน

```bash
git checkout main
git pull
git checkout -b feat/vocab-search      # ตั้งชื่อ branch: <ประเภท>/<feature>-<สั้นๆ>
```

ประเภท branch/commit: `feat` (เพิ่มของใหม่), `fix` (แก้บั๊ก), `docs` (เอกสาร), `style` (หน้าตา), `refactor`, `chore`

## ระหว่างทำ

- commit บ่อยๆ ข้อความสั้นและบอกว่าทำอะไร เช่น `feat(vocab): เพิ่มช่องค้นหา`
- แก้เฉพาะโฟลเดอร์ feature ของตัวเอง (ดู `docs/OWNERSHIP.md`)
- ก่อน push ให้รัน `npm run build` ใน `frontend/` ให้ผ่าน

## เปิด Pull Request

1. `git push -u origin <ชื่อ branch>` แล้วเปิด PR เข้า `main` บน GitHub
2. กรอก template ให้ครบ (แก้ feature ไหน, แตะไฟล์กลางไหม, ภาพหน้าจอ)
3. ถ้าแตะไฟล์กลาง: ติดป้าย `shared` และแจ้งในกลุ่ม — GitHub จะขอ review จากเจ้าของให้อัตโนมัติผ่าน `CODEOWNERS`
4. ได้ approve อย่างน้อย 1 คนแล้วค่อย merge (แนะนำ "Squash and merge")

## ตั้งค่า GitHub (เจ้าของ repo ทำครั้งเดียว — ฟรี)

Settings → Branches → Add rule สำหรับ `main`:
- ✅ Require a pull request before merging
- ✅ Require review from Code Owners

## ถ้าเกิด conflict

อย่าตกใจ — `git pull origin main` ใน branch ของตัวเอง แก้ส่วนที่ชนให้เรียบร้อย
ถ้า conflict อยู่ในไฟล์ของคนอื่น ให้ถามเจ้าของไฟล์ก่อนเลือกว่าจะเก็บของใคร
