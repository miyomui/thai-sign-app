import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import { getCategory } from '@/lib/constants/categories';
import { searchWords, useVocabList, useWordModal } from '@/features/vocab';

/**
 * ช่องค้นหาใน Topbar
 * - อยู่หน้าคำศัพท์ → กรองการ์ดในหน้า (ผ่าน ?q=)
 * - อยู่หน้าอื่น → แสดงคำแนะนำ 5 คำ กดแล้วเปิดหน้าต่างรายละเอียดคำ
 */
export function SearchBox() {
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { words } = useVocabList();
  const { openWord } = useWordModal();
  const onVocab = pathname === ROUTES.vocab;

  const [q, setQ] = useState(onVocab ? params.get('q') ?? '' : '');
  const [focused, setFocused] = useState(false);

  // ออกจากหน้าคำศัพท์ → ล้างช่องค้นหา
  useEffect(() => {
    if (!onVocab) setQ('');
  }, [onVocab]);

  const onChange = (value) => {
    setQ(value);
    if (onVocab) {
      const next = new URLSearchParams(params);
      if (value.trim()) next.set('q', value);
      else next.delete('q');
      setParams(next, { replace: true });
    }
  };

  const matches = searchWords(words, q);
  const showSuggestions = !onVocab && focused && q.trim().length > 0;

  const pickWord = (id) => {
    setQ('');
    setFocused(false);
    openWord(id);
  };

  const seeAll = () => {
    setFocused(false);
    navigate(`${ROUTES.vocab}?q=${encodeURIComponent(q)}`);
  };

  return (
    <div
      role="search"
      className="relative max-w-[560px] flex-1"
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-ink-muted">
        ⌕
      </span>
      <input
        type="search"
        value={q}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setFocused(false);
          if (e.key === 'Enter' && !onVocab && q.trim()) seeAll();
        }}
        placeholder="ค้นหาคำศัพท์ หรือหัวข้อ…"
        aria-label="ค้นหาคำศัพท์"
        className="h-11 w-full rounded-full border border-transparent bg-secondary/35 pl-[42px] pr-4 text-[15px] text-ink outline-none"
      />
      {showSuggestions && (
        <div className="absolute inset-x-0 top-[52px] flex flex-col gap-0.5 rounded-card border border-line bg-card p-2 shadow-hover">
          {matches.slice(0, 5).map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => pickWord(w.id)}
              className="flex min-h-11 w-full items-center justify-between gap-3 rounded-[10px] border-none bg-transparent px-3 py-2 text-left text-ink hover:bg-surface"
            >
              <span className="text-[15px] font-semibold">{w.th}</span>
              <span className="text-[13px] text-ink-muted">{getCategory(w.categoryId)?.short}</span>
            </button>
          ))}
          {matches.length === 0 && <div className="p-3 text-sm text-ink-muted">ไม่พบคำศัพท์ที่ค้นหา</div>}
          <button
            type="button"
            onClick={seeAll}
            className="mt-1 h-10 border-x-0 border-b-0 border-t border-line bg-transparent px-3 text-left text-sm font-semibold text-primary-strong"
          >
            ดูผลทั้งหมดในหน้าคำศัพท์ →
          </button>
        </div>
      )}
    </div>
  );
}
