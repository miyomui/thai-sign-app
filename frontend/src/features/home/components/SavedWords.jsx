import { HeartButton, SectionHeader } from '@/components/ui';
import { getCategory } from '@/lib/constants/categories';
import { cn } from '@/lib/utils/cn';
import { useProgress } from '@/features/progress';
import { useWordModal } from '@/features/vocab';

/** คำศัพท์ที่ผู้ใช้กด ♥ ไว้ */
export function SavedWords({ words }) {
  const { savedIds, isLearned, toggleSave } = useProgress();
  const { openWord } = useWordModal();
  const saved = words.filter((w) => savedIds.includes(w.id));

  return (
    <section id="saved" className="flex scroll-mt-20 flex-col gap-4">
      <SectionHeader title="คำศัพท์ที่บันทึกไว้" />
      {saved.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          {saved.map((w) => {
            const cat = getCategory(w.categoryId);
            return (
              <div key={w.id} className="flex flex-col gap-2.5 rounded-card bg-card p-2.5 shadow-card">
                <button
                  type="button"
                  onClick={() => openWord(w.id)}
                  aria-label={`เล่นท่าภาษามือคำว่า ${w.th}`}
                  className="stripes-green aspect-[4/3] rounded-btn border-none font-mono text-[11px] text-ink-muted"
                >
                  {w.id} · ภาพท่า
                </button>
                <div className="flex items-center justify-between gap-2 px-1">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-base font-semibold">
                      {w.th}
                      {isLearned(w.id) && (
                        <span title="เรียนแล้ว" className="ml-1.5 text-gold">
                          ★
                        </span>
                      )}
                    </span>
                    <span className={cn('self-start rounded-full px-2 py-0.5 text-xs', cat?.chipClass)}>{cat?.short}</span>
                  </div>
                  <HeartButton saved onToggle={() => toggleSave(w.id)} label="เลิกบันทึก" size="md" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="m-0 text-[15px] text-ink-muted">ยังไม่มีคำที่บันทึก กด ♡ ที่คำใดก็ได้เพื่อเก็บไว้ที่นี่</p>
      )}
    </section>
  );
}
