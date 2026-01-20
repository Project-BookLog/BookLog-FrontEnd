import type { ReactNode } from "react";

type Props = { children: ReactNode };

function MobileLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="w-full max-w-sm min-h-screen bg-white relative">
        {children}
      </div>
    </div>
  );
}

export default MobileLayout;
