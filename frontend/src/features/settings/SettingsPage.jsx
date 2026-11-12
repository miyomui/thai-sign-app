import { Link } from 'react-router-dom';
import { EmptyState, PageTitle } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';

/** หน้าตั้งค่า /settings (placeholder) */
export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle>ตั้งค่า</PageTitle>
      <EmptyState>หน้านี้ยังไม่มี spec — เช่น ขนาดตัวอักษร, ความเร็วเริ่มต้นของอวตาร, โปรไฟล์</EmptyState>
    </div>
  );
}

/** หน้าช่วยเหลือ /help (placeholder) */
export function HelpPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle>ช่วยเหลือ</PageTitle>
      <EmptyState>หน้านี้ยังไม่มี spec — เช่น วิธีใช้งาน, คำถามที่พบบ่อย, ติดต่อทีม</EmptyState>
    </div>
  );
}

/** ไม่พบหน้า */
export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle>ไม่พบหน้านี้</PageTitle>
      <EmptyState>
        ลิงก์อาจผิดหรือหน้าถูกย้ายแล้ว · <Link to={ROUTES.home}>กลับหน้าแรก</Link>
      </EmptyState>
    </div>
  );
}
