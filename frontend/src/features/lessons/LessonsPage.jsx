import { useState } from 'react';
import { ChipRow, FilterChip, PageTitle } from '@/components/ui';
import { useVocabList } from '@/features/vocab';
import { ExerciseCard } from './components/ExerciseCard';
import { LessonCard } from './components/LessonCard';
import { EXERCISES, LESSONS } from './mock/lessons';

const ALL = 'ทั้งหมด';

/** หน้ารายการบทเรียน /lessons */
export default function LessonsPage() {
  const [filter, setFilter] = useState(ALL);
  const { words } = useVocabList();
  const tags = [ALL, ...LESSONS.map((l) => l.tag)];
  const lessons = LESSONS.filter((l) => filter === ALL || l.tag === filter);
  const countWords = (categoryId) => words.filter((w) => w.categoryId === categoryId).length;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <PageTitle>บทเรียน</PageTitle>
        <ChipRow>
          {tags.map((t) => (
            <FilterChip key={t} active={filter === t} onClick={() => setFilter(t)} className="border-none">
              {t}
            </FilterChip>
          ))}
        </ChipRow>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {lessons.map((l) => (
          <LessonCard key={l.id} lesson={l} wordCount={countWords(l.categoryId)} />
        ))}
      </div>

      <section className="mt-3 flex flex-col gap-4">
        <h2 className="m-0 font-display text-2xl font-semibold">แบบฝึกหัดแนะนำสำหรับคุณ</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
          {EXERCISES.map((e) => (
            <ExerciseCard key={e.id} exercise={e} />
          ))}
        </div>
      </section>
    </div>
  );
}
