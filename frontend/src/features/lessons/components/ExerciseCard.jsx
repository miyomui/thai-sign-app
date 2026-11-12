import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

/** การ์ดแบบฝึกหัดแนะนำ */
export function ExerciseCard({ exercise }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl-card bg-surface p-5">
      <span className="self-start rounded-full bg-card px-2.5 py-1 text-[13px]">จากบท{exercise.from}</span>
      <h3 className="m-0 font-display text-[19px] font-semibold">{exercise.title}</h3>
      <p className="m-0 text-pretty text-[15px] leading-[1.55]">{exercise.desc}</p>
      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-sm text-ink-muted">{exercise.count} ข้อ</span>
        {/* TODO(quiz): แยกแบบฝึกหัดแต่ละรูปแบบ ตอนนี้ไปหน้าฝึกทบทวนก่อน */}
        <Link
          to={ROUTES.practice}
          className="flex h-11 items-center rounded-btn bg-primary-strong px-5 font-display text-[15px] font-semibold !text-white no-underline"
        >
          เริ่มฝึก
        </Link>
      </div>
    </div>
  );
}
