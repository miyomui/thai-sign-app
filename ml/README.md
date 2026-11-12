# ml/ — งานเทรน AI ตรวจจับท่ามือ

เทรนใน **Google Colab** (ฟรี) แล้ว export เป็น TensorFlow.js ไปใช้ในเว็บ
ข้อตกลง input/output ของโมเดล: [docs/integration/sign-ai-model.md](../docs/integration/sign-ai-model.md)

## โครงโฟลเดอร์

```
ml/
├─ notebooks/      ไฟล์ .ipynb ที่ดาวน์โหลดจาก Colab (เก็บไว้เป็นประวัติ)
└─ README.md       ไฟล์นี้: ลิงก์ Colab + บันทึกเวอร์ชันโมเดล
```

## ลิงก์ Colab

| Notebook | ทำอะไร | ลิงก์ | ผู้ดูแล |
|---|---|---|---|
| เก็บข้อมูล landmark | อัดวิดีโอ → landmark .npy | ______ | ______ |
| เทรน classifier | LSTM/GRU บน landmark | ______ | ______ |

## บันทึกเวอร์ชันโมเดล

| เวอร์ชัน | วันที่ | จำนวนคำ | accuracy (test) | หมายเหตุ |
|---|---|---|---|---|
| sign-v0 | — | — | — | ยังไม่มี |

## กติกา

- ห้ามอัปโหลดวิดีโอใบหน้าคนจริงขึ้น GitHub (ข้อมูลส่วนบุคคล) — เก็บใน Google Drive ของทีม
- โมเดลที่พร้อมใช้ วางที่ `frontend/public/models/sign-v<เวอร์ชัน>/`
