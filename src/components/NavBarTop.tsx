import type { ReactNode } from "react";
import { BackIcon } from "../assets/icons";

type NavBarProps = {
  title?: string;
  subtitle?: string;
  rightText?: string;
  rightSlot?: ReactNode;
  back?: boolean;
  leftContent?: ReactNode;
  centerSlot?: ReactNode;
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
        className={subtitle ? "-translate-y-1.5" : ""}
      >
        <BackIcon className="w-6 h-6" />
      </button>
    );
  };

  const renderRight = () => {
    if (rightSlot) return rightSlot;

    if (rightText) {
      return (
        <button type="button" className="text-subtitle-02-sb">
          {rightText}
        </button>
      );
    }
  };

  return (
    <header className="pt-2 h-17 px-4 flex items-center bg-bg">
      {/* 왼쪽 영역 */}
      <div className="shrink-0">
        {renderLeft()}
      </div>

      {/* 중앙 영역 */}
      <div className="flex-1 min-w-0 px-2">
        <div className="flex flex-col justify-center min-w-0 w-full">
          {centerSlot ? (
            <div className="w-full min-w-0">
              {centerSlot}
            </div>
          ) : (
            <>
              {title && (
                <span className="text-title-01 truncate text-center pr-6">
                  {title}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="shrink-0">
        {renderRight()}
      </div>
    </header>
  );
}

export default NavBarTop;
