import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/ui';
import { CATEGORIES } from '@/lib/constants/categories';
import { ROUTES } from '@/lib/constants/routes';

/** การ์ดหมวดหมู่คำศัพท์ (ซ่อนหมวดที่ยังไม่มีคำ) */
export function CategoryGrid({ words }) {
  const cats = CATEGORIES.map((c) => ({ ...c, count: words.filter((w) => w.categoryId === c.id).length })).filter(
    (c) => c.count > 0,
  );

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="หมวดหมู่คำศัพท์"
        action={
          <Link to={ROUTES.vocab} className="text-[15px] font-semibold no-underline">
            ดูทั้งหมด →
          </Link>
        }
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
        {cats.map((c) => (
          <Link
            key={c.id}
            to={`${ROUTES.vocab}?cat=${c.id}`}
            className="flex h-[120px] flex-col items-start justify-between rounded-card bg-surface p-4 !text-ink no-underline transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-hover"
          >
            <span className="text-pretty font-display text-base font-semibold leading-[1.35]">{c.name}</span>
            <span className="flex w-full justify-between text-[13px]">
              <span>{c.count} คำ</span>
              <span className="rounded-full bg-card px-2 py-0.5">พื้นฐาน</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
