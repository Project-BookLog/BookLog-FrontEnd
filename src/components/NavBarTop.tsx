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
        className={`shrink-0 ${subtitle ? "-translate-y-1.5" : ""}`}
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
    // 오른쪽이 없을 때도 왼쪽과 균형 맞추기 위한 더미
    return <div className="w-6" />; 
  };

  return (
    <header className="h-15.5 mt-2 px-4 flex items-center bg-[#F7F5F3]">
      {/* 왼쪽 영역 */}
      <div className="shrink-0">
        {renderLeft()}
      </div>

      {/* 중앙 영역 */}
      <div className="flex-1 flex justify-center min-w-0">
        <div className="flex flex-col items-center min-w-0">
          {centerSlot ? (
            centerSlot
          ) : (
            <>
              {title && (
                <span className="text-title-01 truncate text-center">
                  {title}
                </span>
              )}
              {subtitle && (
                <span className="text-subtitle-02 truncate text-center">
                  {subtitle}
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
