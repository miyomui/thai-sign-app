import { cn } from '@/lib/utils/cn';

/**
 * แถบแท็บ — tabs: [{ id, label }], value: id ที่เลือก
 * เนื้อหาของแท็บให้หน้าเรนเดอร์เองใน <TabPanel>
 */
export function Tabs({ tabs, value, onChange, label, idPrefix = 'tab' }) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-line">
      {tabs.map((t) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            id={`${idPrefix}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            onClick={() => onChange(t.id)}
            className={cn(
              'h-11 flex-none whitespace-nowrap rounded-t-[10px] border-b-[3px] px-3 font-display text-sm text-ink',
              selected ? 'border-accent bg-secondary font-semibold' : 'border-transparent bg-transparent font-medium',
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ value, idPrefix = 'tab', className, children }) {
  return (
    <div
      id={`${idPrefix}-panel`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-${value}`}
      className={cn('flex flex-col gap-3', className)}
    >
      {children}
    </div>
  );
}
