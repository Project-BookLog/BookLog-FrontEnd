import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = { children?: ReactNode };

function MobileLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-200">
      <div className="w-full max-w-sm min-h-screen bg-bg">
        {children ?? <Outlet />}
      </div>
    </div>
  );
}

export default MobileLayout;
