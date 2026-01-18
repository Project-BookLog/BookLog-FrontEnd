interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen flex items-center justify-center bg-black/15 backdrop-blur-[2px]">
      <div className="inline-flex flex-col items-center px-6 py-4 gap-2 rounded-[12px] bg-b-op40 backdrop-blur-[10px]">
        <p className="text-white text-subtitle-02-sb text-center">{message}</p>
      </div>
    </div>
  );
}
