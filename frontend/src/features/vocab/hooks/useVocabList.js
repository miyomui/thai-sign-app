import { useEffect, useState } from 'react';
import { isSupabaseReady } from '@/lib/supabaseClient';
import { fetchAllWords } from '../api/vocabApi';
import { MOCK_WORDS } from '../mock/vocab';

// เก็บผลไว้ จะได้ไม่โหลดซ้ำทุกครั้งที่เปลี่ยนหน้า
let cache = isSupabaseReady ? null : MOCK_WORDS;
let pending = null;

/**
 * คำศัพท์ทั้งหมด
 * @returns {{ words: Array, loading: boolean, error: Error|null }}
 */
export function useVocabList() {
  const [words, setWords] = useState(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;
    pending ??= fetchAllWords();
    pending
      .then((w) => {
        cache = w;
        setWords(w);
      })
      .catch((e) => {
        pending = null;
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { words, loading, error };
}

/** หาคำจากรหัส เช่น findWord(words, 'V001') */
export function findWord(words, id) {
  return words.find((w) => w.id === id);
}

/** กรองคำจากข้อความค้นหา (ค้นทั้งคำไทยและ gloss) */
export function searchWords(words, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return words.filter((w) => w.th.includes(q) || w.gloss.toLowerCase().includes(q));
}
