import { cn } from '@/lib/utils/cn';
import { VocabCard } from './VocabCard';

/** section หนึ่งหมวด: หัวข้อ chip + grid การ์ด (หรือป้าย "เร็ว ๆ นี้" ถ้ายังไม่มีคำ) */
export function CategorySection({ category, words, comingSoon, isLearned, onOpenWord }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className={cn('m-0 rounded-full px-4 py-1.5 font-display text-[17px] font-semibold', category.chipClass)}>
          หมวด: {category.name}
        </h2>
        {words.length > 0 && <span className="text-sm text-ink-muted">{words.length} คำ</span>}
        {comingSoon && (
          <span className="rounded-full border border-dashed border-primary px-3 py-1 text-[13px] text-primary-strong">
            เร็ว ๆ นี้
          </span>
        )}
      </div>
      {words.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          {words.map((w) => (
            <VocabCard key={w.id} word={w} learned={isLearned(w.id)} onOpen={() => onOpenWord(w.id)} />
          ))}
        </div>
      )}
    </section>
  );
}
