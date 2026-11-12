import { ToastProvider } from '@/components/ui';
import { AuthProvider } from '@/features/auth';
import { ProgressProvider } from '@/features/progress';
import { WordModalProvider } from '@/features/vocab';

/** Provider ทั้งหมดของแอป (ลำดับสำคัญ: ตัวในใช้ของตัวนอกได้) */
export function AppProviders({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProgressProvider>
          <WordModalProvider>{children}</WordModalProvider>
        </ProgressProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
