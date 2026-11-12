import { useSearchParams } from 'react-router-dom';
import { ChipRow, EmptyState, FilterChip, PageTitle } from '@/components/ui';
import { CATEGORIES } from '@/lib/constants/categories';
import { useProgress } from '@/features/progress';
import { CategorySection } from './components/CategorySection';
import { searchWords, useVocabList } from './hooks/useVocabList';
import { useWordModal } from './hooks/useWordModal';

const ALL = 'all';

/**
 * หน้าคำศัพท์ /vocab
 * URL params: ?cat=<category id> เลือกหมวด, ?q=<คำค้น> (มาจากช่องค้นหาใน Topbar)
 */
export default function VocabPage() {
  const [params, setParams] = useSearchParams();
  const { words, loading, error } = useVocabList();
  const { isLearned } = useProgress();
  const { openWord } = useWordModal();

  const cat = params.get('cat') ?? ALL;
  const q = (params.get('q') ?? '').trim();
  const matches = q ? searchWords(words, q) : null;

  const setCat = (id) => {
    const next = new URLSearchParams(params);
    if (id === ALL) next.delete('cat');
    else next.set('cat', id);
    setParams(next, { replace: true });
  };

  const sections = CATEGORIES.filter((c) => cat === ALL || cat === c.id)
    .map((c) => {
      const all = words.filter((w) => w.categoryId === c.id);
      const shown = matches ? all.filter((w) => matches.includes(w)) : all;
      return { category: c, words: shown, comingSoon: all.length === 0 };
    })
    // ระหว่างค้นหา ซ่อนหมวดที่ไม่มีผล; ปกติแสดงหมวดว่างพร้อมป้าย "เร็ว ๆ นี้"
    .filter((s) => s.words.length > 0 || (!q && s.comingSoon));

  const meta = q
    ? `ผลการค้นหา “${q}” · ${matches.length} คำ`
    : `${words.length} คำ · ${CATEGORIES.length} หมวด`;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <PageTitle meta={meta}>คำศัพท์</PageTitle>
        <ChipRow>
          <FilterChip active={cat === ALL} onClick={() => setCat(ALL)}>
            ทั้งหมด
          </FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name}
            </FilterChip>
          ))}
        </ChipRow>
      </div>

      {loading && <EmptyState>กำลังโหลดคำศัพท์…</EmptyState>}
      {error && <EmptyState>โหลดคำศัพท์ไม่สำเร็จ ลองรีเฟรชหน้าอีกครั้ง</EmptyState>}
      {!loading && q && matches.length === 0 && <EmptyState>ไม่พบคำศัพท์ที่ค้นหา</EmptyState>}

      {sections.map((s) => (
        <CategorySection
          key={s.category.id}
          category={s.category}
          words={s.words}
          comingSoon={s.comingSoon}
          isLearned={isLearned}
          onOpenWord={openWord}
        />
      ))}
    </div>
  );
}
