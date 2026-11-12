import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(() => {});

/** ครอบแอปไว้ใน app/providers.jsx แล้ว — ในหน้าต่างๆ ใช้ useToast() */
export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timer = useRef();

  const show = useCallback((msg) => {
    setMessage(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 1800);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
        {message && (
          <div role="status" className="rounded-full bg-ink px-5 py-3 text-[15px] text-bg shadow-hover">
            {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

/** const toast = useToast(); toast('บันทึกแล้ว') */
export function useToast() {
  return useContext(ToastContext);
}
