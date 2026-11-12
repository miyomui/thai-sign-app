import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { WordDetailModal } from '../components/WordDetailModal';
import { findWord, useVocabList } from './useVocabList';

const WordModalContext = createContext({ openWord: () => {}, closeWord: () => {} });

/** ครอบแอปไว้ใน app/providers.jsx — ทำให้ทุกหน้าเปิดหน้าต่างรายละเอียดคำได้ */
export function WordModalProvider({ children }) {
  const { words } = useVocabList();
  const [openId, setOpenId] = useState(null);
  const closeWord = useCallback(() => setOpenId(null), []);
  const value = useMemo(() => ({ openWord: setOpenId, closeWord }), [closeWord]);
  const word = openId ? findWord(words, openId) : null;

  return (
    <WordModalContext.Provider value={value}>
      {children}
      {word && <WordDetailModal key={word.id} word={word} onClose={closeWord} />}
    </WordModalContext.Provider>
  );
}

/** const { openWord } = useWordModal(); openWord('V001') */
export function useWordModal() {
  return useContext(WordModalContext);
}
