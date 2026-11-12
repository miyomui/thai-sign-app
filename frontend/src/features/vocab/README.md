# features/vocab — หน้าคำศัพท์

**เจ้าของ:** ______ · **Route:** `/vocab` · **Spec:** [docs/design/vocab.md](../../../../docs/design/vocab.md)

เรียกดูคำศัพท์แยกตามหมวด, กรองหมวดด้วย chip, ค้นหา (จาก Topbar ผ่าน `?q=`), กดการ์ดเพื่อเปิดหน้าต่างรายละเอียดคำ

## โครงไฟล์

| ไฟล์ | ทำอะไร |
|---|---|
| `VocabPage.jsx` | หน้า `/vocab` |
| `components/VocabCard.jsx` | การ์ดคำ 1 ใบ |
| `components/CategorySection.jsx` | หัวข้อหมวด + grid การ์ด |
| `components/WordDetailModal.jsx` | หน้าต่างรายละเอียดคำ (อวตาร, เล่นซ้ำ, ช้า, ดูแบบ AR) |
| `hooks/useVocabList.js` | โหลดคำศัพท์ทั้งหมด + `findWord`, `searchWords` |
| `hooks/useWordModal.jsx` | `WordModalProvider` + `useWordModal()` เปิดหน้าต่างจากหน้าไหนก็ได้ |
| `api/vocabApi.js` | อ่านตาราง `vocab` จาก Supabase (fallback เป็น mock) |
| `mock/vocab.js` | คำศัพท์ตัวอย่าง V001–V042 |

## ให้ feature อื่นใช้ (index.js)

- `useVocabList()` → `{ words, loading, error }`
- `findWord(words, id)`, `searchWords(words, query)`
- `useWordModal()` → `{ openWord(id), closeWord() }`
- `VocabCard`

## เชื่อมกับ

- `avatar` — แสดงท่าในหน้าต่างรายละเอียด
- `progress` — ดาว "เรียนแล้ว"
- `ar` — ปุ่ม "ดูแบบ AR" ส่ง `?vocab=<id>`
