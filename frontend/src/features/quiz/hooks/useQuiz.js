import { useState } from 'react';

/**
 * ตัวจัดการแบบทดสอบแบบเลือกตอบ
 * questions: [{ choices: string[], answer: number, ...อะไรก็ได้ }]
 */
export function useQuiz(questions) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongIndexes, setWrongIndexes] = useState([]);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const answered = picked !== null;
  const isLast = index === questions.length - 1;

  const pick = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === question.answer) setScore((s) => s + 1);
    else setWrongIndexes((w) => [...w, index]);
  };

  const next = () => {
    if (isLast) setDone(true);
    else {
      setIndex(index + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setWrongIndexes([]);
    setDone(false);
  };

  return {
    question,
    index,
    total: questions.length,
    picked,
    answered,
    isCorrect: answered && picked === question.answer,
    isLast,
    score,
    wrongIndexes,
    done,
    /** % ความก้าวหน้า (นับข้อที่ตอบแล้ว) */
    progressPct: ((index + (answered ? 1 : 0)) / questions.length) * 100,
    pick,
    next,
    restart,
  };
}
