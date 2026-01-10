import type { ReactNode } from "react";
import { BackIcon } from "../assets/icons";

// NavBarTop.tsx 수정 예시: title 대신 centerSlot을 허용
type NavBarProps = {
  title?: string;
  subtitle?: string;
  rightText?: string;
  rightSlot?: ReactNode;
  back?: boolean;
  leftContent?: ReactNode;
  centerSlot?: ReactNode; // 추가
  onBack?: () => void;
};

function NavBarTop({
  title,
  subtitle,
  rightText,
  rightSlot,
  back = true,
  leftContent,
  centerSlot,
  onBack,
}: NavBarProps) {
  const renderLeft = () => {
    if (leftContent) return leftContent;
    if (!back) return null;

    return (
      <button
        type="button"
        onClick={onBack}
        className={`shrink-0 ${subtitle ? "-translate-y-1.5" : ""}`}
      >
        <BackIcon className="w-6 h-6" />
      </button>
    );
  };

  return (
    <header className="h-15.5 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {renderLeft()}

        <div className="flex flex-col min-w-0 flex-1">
          {centerSlot ? (
            centerSlot
          ) : (
            <>
              {title && (
                <span className="text-title-01 truncate">{title}</span>
              )}
              {subtitle && (
                <span className="text-subtitle-02-m text-gray-700 truncate">
                  {subtitle}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {rightSlot ? (
        <div className="shrink-0">{rightSlot}</div>
      ) : rightText ? (
        <button type="button" className="text-subtitle-02-sb">
          {rightText}
        </button>
      ) : null}
    </header>
  );
}

export default NavBarTop;
