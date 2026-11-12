import { EmptyState, PageTitle } from '@/components/ui';

/** เปลี่ยนชื่อไฟล์เป็น <Name>Page.jsx */
export default function ExamplePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle>ชื่อหน้า</PageTitle>
      <EmptyState>เริ่มทำที่นี่</EmptyState>
    </div>
  );
}
