import { useEffect } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description?: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmModal({
    isOpen,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onClose,
}: ConfirmModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-black/15 backdrop-blur-[2px]"
            onClick={onClose}
        >
            <div
                className="flex w-[267px] flex-col items-center gap-4 px-3 pt-6 pb-2 bg-white rounded-[12px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center gap-1">
                    <p className="text-black text-subtitle-02-sb text-center">{title}</p>
                    {description && <p className="text-gray-700 text-caption-02 text-center">{description}</p>}
                </div>
                <div className="flex justify-center items-center gap-1 self-stretch">
                    <button
                        onClick={onConfirm}
                        className="flex justify-center items-center w-[120px] px-[10px] py-[14px] gap-[10px] rounded-[8px] bg-warning-bg text-center text-subtitle-02-sb text-warning cursor-pointer"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex justify-center items-center w-[120px] px-[10px] py-[14px] gap-[10px] rounded-[8px] bg-gray-100 text-center text-subtitle-02-sb text-gray-700 cursor-pointer"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
