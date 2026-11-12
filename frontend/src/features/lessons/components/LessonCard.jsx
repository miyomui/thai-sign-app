import { Link } from 'react-router-dom';
import { Card, ProgressBar } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

function lessonStatus(percent) {
  if (percent === 0) return { label: 'ยังไม่เริ่ม', badge: 'bg-card', button: 'เริ่มเรียน', done: false };
  if (percent === 100) return { label: '★ เรียนจบแล้ว', badge: 'bg-gold', button: 'ทบทวนอีกครั้ง', done: true };
  return { label: 'กำลังเรียน', badge: 'bg-surface', button: 'เรียนต่อ', done: false };
}

/** การ์ดบทเรียน: ภาพปก + สถานะ + progress + ปุ่ม */
export function LessonCard({ lesson, wordCount }) {
  const s = lessonStatus(lesson.percent);
  return (
    <Card as="article" rounded="xl" className="flex flex-col overflow-hidden">
      <div className="stripes-green relative flex aspect-video items-center justify-center">
        <span className="font-mono text-[11px] text-ink-muted">ภาพปกบท {lesson.id}</span>
        <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-[13px] font-semibold', s.badge)}>
          {s.label}
        </span>
      </div>
      <div className="flex flex-col gap-3.5 px-5 pb-5 pt-[18px]">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[13px] font-medium text-ink-muted">บทที่ {lesson.id}</span>
          <h3 className="m-0 font-display text-[19px] font-semibold leading-[1.3]">{lesson.title}</h3>
          <span className="text-[15px] text-ink-muted">คำศัพท์ {wordCount} คำ</span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar
            value={lesson.percent}
            label={`ความก้าวหน้าบท ${lesson.title}`}
            fillClassName={s.done ? 'bg-gradient-to-r from-accent to-gold' : 'bg-primary'}
            className="flex-1"
          />
          <span className="min-w-11 text-right font-display text-base font-semibold">{lesson.percent}%</span>
        </div>
        <Link
          to={ROUTES.lesson(lesson.id)}
          className={cn(
            'flex h-11 items-center justify-center rounded-btn font-display text-[15px] font-semibold no-underline',
            s.done ? 'bg-secondary !text-ink' : 'bg-primary-strong !text-white',
          )}
        >
          {s.button}
        </Link>
      </div>
    </Card>
  );
}
