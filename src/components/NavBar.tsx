import type { ReactNode } from "react";
import { Back } from "../assets/icons";

type NavBarProps = {
  title?: string;
  subtitle?: string;
  rightText?: string;
  rightSlot?: ReactNode;
  back?: boolean;
  leftContent?: ReactNode;
  onBack?: () => void;
};

function NavBar({
  title,
  subtitle,
  rightText,
  rightSlot,
  back = true,
  leftContent,
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
        <Back className="w-5 h-5" />
      </button>
    );
  };

  return (
      <header className="h-15 px-4 flex items-center justify-between ...">
        <div className="flex items-center gap-2 min-w-0">
          {renderLeft()}

        <div className="flex flex-col min-w-0">
          {title && (
            <span className="text-m font-semibold text-gray-900 truncate">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-gray-500 truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {rightSlot ? (
        <div className="shrink-0">{rightSlot}</div>
      ) : rightText ? (
        <button
          type="button"
          className="text-xs font-medium text-indigo-600"
        >
          {rightText}
        </button>
      ) : null}
    </header>
  );
}

export default NavBar;
