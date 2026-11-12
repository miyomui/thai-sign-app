import { useCallback, useState } from 'react';

/**
 * ตรวจจับท่ามือจากกล้อง (จุดเสียบ — ยังไม่มีโมเดล)
 *
 * TODO(sign-ai) เมื่อโมเดลพร้อม:
 *  1. ขออนุมัติทีมแล้วติดตั้ง  @mediapipe/tasks-vision  และ  @tensorflow/tfjs  (ฟรี, Apache-2.0)
 *  2. ใช้ HandLandmarker อ่าน landmark จาก videoRef ทีละเฟรม → เก็บ SEQUENCE_LENGTH เฟรม
 *  3. โหลดโมเดลจาก MODEL_URL → model.predict([1, 30, 126]) → map ผลกับ labels.json
 *
 * รูปแบบที่ส่งออกด้านล่างห้ามเปลี่ยนโดยไม่แจ้งทีม (หน้าอื่นจะเรียกใช้)
 *
 * @returns {{ status: 'not-ready'|'idle'|'running'|'error', result: {vocabId:string, confidence:number}|null, start: Function, stop: Function }}
 */
export function useSignRecognizer() {
  const [status, setStatus] = useState('not-ready');
  const [result, setResult] = useState(null);

  const start = useCallback(() => {
    setStatus('not-ready');
    setResult(null);
  }, []);

  const stop = useCallback(() => setStatus((s) => (s === 'running' ? 'idle' : s)), []);

  return { status, result, start, stop };
}
