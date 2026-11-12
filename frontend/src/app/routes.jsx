import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/features/home';
import { VocabPage } from '@/features/vocab';
import { LessonsPage, LessonFlashcardPage } from '@/features/lessons';
import { PracticePage } from '@/features/practice';
import { ArPage } from '@/features/ar';
import { SettingsPage, HelpPage, NotFoundPage } from '@/features/settings';
import { AppShell } from './layout/AppShell';

/** ทุกหน้าของแอป (ไฟล์กลาง — เพิ่มหน้าใหม่ต้องแจ้งทีม) */
export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/vocab', element: <VocabPage /> },
      { path: '/lessons', element: <LessonsPage /> },
      { path: '/lessons/:lessonId', element: <LessonFlashcardPage /> },
      { path: '/practice', element: <PracticePage /> },
      { path: '/ar', element: <ArPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/help', element: <HelpPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
