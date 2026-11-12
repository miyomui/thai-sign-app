import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useToast } from '@/components/ui';
import { loadProgress, saveProgress } from '../api/progressStore';

const ProgressContext = createContext(null);

/** ครอบแอปไว้ใน app/providers.jsx */
export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadProgress);
  const toast = useToast();

  useEffect(() => saveProgress(state), [state]);

  const toggleSave = useCallback(
    (id) => {
      const willSave = !state.savedIds.includes(id);
      setState((s) => ({
        ...s,
        savedIds: willSave ? [...s.savedIds, id] : s.savedIds.filter((x) => x !== id),
      }));
      toast(willSave ? 'บันทึกแล้ว' : 'นำออกจากที่บันทึกแล้ว');
    },
    [state.savedIds, toast],
  );

  const markLearned = useCallback((ids) => {
    setState((s) => ({ ...s, learnedIds: [...new Set([...s.learnedIds, ...ids])] }));
  }, []);

  const recordQuizResult = useCallback((attempt) => {
    setState((s) => ({
      ...s,
      quizAttempts: [...s.quizAttempts, { ...attempt, at: new Date().toISOString() }].slice(-50),
    }));
  }, []);

  const value = useMemo(
    () => ({
      savedIds: state.savedIds,
      learnedIds: state.learnedIds,
      quizAttempts: state.quizAttempts,
      isSaved: (id) => state.savedIds.includes(id),
      isLearned: (id) => state.learnedIds.includes(id),
      toggleSave,
      markLearned,
      recordQuizResult,
    }),
    [state, toggleSave, markLearned, recordQuizResult],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

/**
 * ความก้าวหน้าของผู้ใช้
 * - savedIds, isSaved(id), toggleSave(id)            คำที่บันทึก (♥)
 * - learnedIds, isLearned(id), markLearned([ids])   คำที่เรียนแล้ว (★)
 * - recordQuizResult({ source, score, total, wrongIds })
 */
export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress ต้องอยู่ภายใน <ProgressProvider>');
  return ctx;
}
