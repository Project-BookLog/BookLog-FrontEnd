import { useRef, useState } from "react";
import { createContext, useContext } from "react";


interface ToastContextValue {
  message: string | null;
  showToast: (msg: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
