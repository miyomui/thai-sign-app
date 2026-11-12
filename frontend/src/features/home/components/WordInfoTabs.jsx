import { useState } from 'react';
import { TabPanel, Tabs } from '@/components/ui';
import { getCategory } from '@/lib/constants/categories';
import { cn } from '@/lib/utils/cn';
import { DEFAULT_NOTE, SIGN_STEPS, USAGE_NOTES, exampleSentences } from '../mock/featured';

const TABS = [
  { id: 'detail', label: 'รายละเอียด' },
  { id: 'steps', label: 'ขั้นตอนการทำท่า' },
  { id: 'examples', label: 'ตัวอย่างการใช้' },
  { id: 'related', label: 'คำศัพท์ที่เกี่ยวข้อง' },
];

/** แท็บข้อมูลของคำแนะนำวันนี้ */
export function WordInfoTabs({ word, related, player, onPickRelated }) {
  const [tab, setTab] = useState('detail');
  const category = getCategory(word.categoryId);
  const stepCount = SIGN_STEPS.length;
  const curStep = player.currentStep(stepCount);

  return (
    <div className="flex min-w-0 flex-[2_1_320px] flex-col gap-4">
      <Tabs tabs={TABS} value={tab} onChange={setTab} label="ข้อมูลคำศัพท์" idPrefix="word-tab" />
      <TabPanel value={tab} idPrefix="word-tab">
        {tab === 'detail' && (
          <div className="flex flex-col gap-3.5 text-base leading-[1.6]">
            <p className="m-0 text-pretty">
              คำว่า “{word.th}” เป็นคำพื้นฐานในหมวดการทักทาย ใช้ในบทสนทนาประจำวันเมื่อพบหรือพูดคุยกับผู้อื่น
            </p>
            <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[15px]">
              <dt className="text-ink-muted">Gloss</dt>
              <dd className="m-0 font-mono text-sm">{word.gloss}</dd>
              <dt className="text-ink-muted">หมวด</dt>
              <dd className="m-0">{category?.name}</dd>
              <dt className="text-ink-muted">ระดับ</dt>
              <dd className="m-0">พื้นฐาน</dd>
            </dl>
            <div className="rounded-btn bg-bg px-3.5 py-3 text-sm text-ink-muted">
              หมายเหตุการใช้: {USAGE_NOTES[word.th] ?? DEFAULT_NOTE}
            </div>
          </div>
        )}

        {tab === 'steps' && (
          <>
            <ol className="m-0 flex list-none flex-col gap-2 p-0">
              {SIGN_STEPS.map((st, i) => (
                <li key={st.text}>
                  <button
                    type="button"
                    aria-current={curStep === i ? 'step' : undefined}
                    onClick={() => player.playSegment((i * 100) / stepCount, ((i + 1) * 100) / stepCount)}
                    className={cn(
                      'flex w-full gap-3 rounded-btn border p-3 text-left text-ink transition-all duration-150 ease-out',
                      curStep === i ? 'border-accent bg-surface' : 'border-line bg-card',
                    )}
                  >
                    <span className="flex size-7 flex-none items-center justify-center rounded-full bg-secondary font-display text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[15px] leading-normal">{st.text}</span>
                      <span className="text-[13px] text-ink-muted">{st.meta}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="m-0 text-[13px] text-ink-muted">
              กดขั้นตอนเพื่อให้อวตารเล่นเฉพาะช่วงนั้น · ขั้นตอนเป็นตัวอย่างรูปแบบ ต้องตรวจกับผู้เชี่ยวชาญภาษามือไทยก่อนใช้งาน
            </p>
          </>
        )}

        {tab === 'examples' &&
          exampleSentences(word.th).map((ex) => (
            <div key={ex.id} className="flex items-center gap-3 rounded-btn border border-line p-3">
              <button
                type="button"
                aria-label={`เล่นท่าทางประโยค ${ex.text}`}
                onClick={player.replay}
                className="flex size-10 flex-none items-center justify-center rounded-full border-none bg-secondary text-[13px] text-ink"
              >
                ▶
              </button>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-semibold">{ex.text}</span>
                <span className="font-mono text-xs text-ink-muted">{ex.id}</span>
              </div>
            </div>
          ))}

        {tab === 'related' && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {related.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onPickRelated(r.id)}
                className="flex w-[132px] flex-none flex-col gap-2 rounded-btn border border-line bg-card p-2 text-left text-ink hover:shadow-hover"
              >
                <span className="stripes-green flex aspect-[4/3] items-center justify-center rounded-lg font-mono text-[11px] text-ink-muted">
                  {r.id}
                </span>
                <span className="px-1 text-[15px] font-semibold">{r.th}</span>
              </button>
            ))}
          </div>
        )}
      </TabPanel>
    </div>
  );
}
