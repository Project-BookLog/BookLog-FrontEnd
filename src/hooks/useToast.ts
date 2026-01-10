import { useRef, useState } from "react";

export function useToast() {
    const [message, setMessage] = useState<string | null>(null);
    const timerRef = useRef<number | null>(null);

    const showToast = (msg: string, duration = 3000) => {
        setMessage(msg);
        
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            setMessage(null);
        }, duration);
    };
    
    return { message, showToast };
}
