import { Button, ProgressBar } from '@/components/ui';
import { useAuth } from '@/features/auth';
import { useProgress } from '@/features/progress';

/** ทักทาย + แถบความก้าวหน้า (หรือปุ่มเข้าสู่ระบบ) */
export function Greeting({ totalWords }) {
  const { user, loggedIn, login } = useAuth();
  const { learnedIds } = useProgress();
  const pct = totalWords ? (learnedIds.length / totalWords) * 100 : 0;

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 font-display text-[28px] font-semibold leading-[1.3]">
          {loggedIn ? `สวัสดี, ${user.name}` : 'ยินดีต้อนรับ'}
        </h1>
        <p className="m-0 text-[15px] text-ink-muted">วันนี้เรียนต่ออีกสักคำไหม</p>
      </div>
      {loggedIn ? (
        <div className="flex min-w-[260px] flex-[0_1_340px] flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-ink-muted">ความก้าวหน้า</span>
            <span className="font-semibold">
              เรียนแล้ว {learnedIds.length} / {totalWords} คำ
            </span>
          </div>
          <ProgressBar value={pct} label="ความก้าวหน้าการเรียน" height="h-2.5" />
        </div>
      ) : (
        <Button className="px-5" onClick={login}>
          เข้าสู่ระบบ
        </Button>
      )}
    </div>
  );
}
