# features/quiz — เครื่องมือแบบทดสอบ (ใช้ร่วม)

**เจ้าของ:** ______ · **Route:** ไม่มี (ใช้ใน practice และแบบฝึกหัดของ lessons)

แยกออกมาเพื่อให้ "ฝึกทบทวน" และ "แบบฝึกหัดในบทเรียน" ใช้ตรรกะเดียวกัน ไม่เขียนซ้ำ

## ใช้งาน

```jsx
import { useQuiz, ChoiceButton, choiceState, ResultPanel } from '@/features/quiz';

const quiz = useQuiz(questions);   // questions: [{ choices: [...], answer: 0 }]
quiz.question.choices.map((c, i) => (
  <ChoiceButton key={c} state={choiceState(quiz, i)} onClick={() => quiz.pick(i)}>{c}</ChoiceButton>
));
```

`quiz` มี: `question, index, total, picked, answered, isCorrect, isLast, score, wrongIndexes, done, progressPct, pick(i), next(), restart()`

## แผนต่อไป

แบบฝึกหัด 3 รูปแบบใน spec บทเรียน (ฝึกจำท่าทาง, ดูคำแล้วเลือกภาพ, เรียงลำดับท่าทาง)
ให้เพิ่มเป็น component ใหม่ใน `components/` ของ feature นี้
