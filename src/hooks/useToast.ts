import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return { message, showToast };
}
