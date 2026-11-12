/** การ์ดคำศัพท์ 1 ใบ (พื้นที่ preview 4:5 + ปุ่ม ▶ + คำไทย + gloss) */
export function VocabCard({ word, learned, onOpen }) {
  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`เล่นท่าภาษามือคำว่า ${word.th}`}
        className="stripes-pink relative aspect-[4/5] overflow-hidden rounded-card border-2 border-transparent p-0 shadow-card transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-hover"
      >
        <span className="absolute inset-x-0 top-[40%] text-center font-mono text-[11px] text-ink-muted">
          {word.id} · อวตาร
        </span>
        {learned && (
          <span
            title="เรียนแล้ว"
            className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full bg-card text-[15px] text-gold"
          >
            ★
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex h-[52px] items-center bg-secondary/75 px-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-card text-xs text-ink">▶</span>
        </span>
      </button>
      <div className="flex flex-col gap-0.5 px-1">
        <span className="font-display text-[17px] font-semibold">{word.th}</span>
        <span className="font-mono text-xs text-ink-muted">{word.gloss}</span>
      </div>
    </div>
  );
}
