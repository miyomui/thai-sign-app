import { useSearchParams } from 'react-router-dom';
import { PageTitle, Placeholder } from '@/components/ui';
import { findWord, useVocabList } from '@/features/vocab';

/**
 * หน้า AR โหมด /ar?vocab=V001 (placeholder — ยังไม่มี spec)
 * TODO(ar): เลือกเทคโนโลยีฟรี เช่น WebXR, <model-viewer> หรือ AR.js แล้วแสดงอวตารตามคำที่ส่งมา
 */
export default function ArPage() {
  const [params] = useSearchParams();
  const { words } = useVocabList();
  const vocabId = params.get('vocab') ?? 'V001';
  const word = findWord(words, vocabId);

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-4">
      <PageTitle>AR โหมด</PageTitle>
      <Placeholder tone="green" label="กล้อง AR · WEBXR / AR.JS" className="aspect-[4/3] rounded-card p-6">
        <span className="text-[15px] text-ink-muted">กำลังแสดงคำ: {word?.th ?? vocabId}</span>
      </Placeholder>
      <p className="m-0 text-sm text-ink-muted">
        หน้านี้ยังไม่มี spec — ใส่ไว้เพื่อให้ลิงก์ "ดูแบบ AR" จากหน้าอื่นมีปลายทาง
      </p>
    </div>
  );
}
