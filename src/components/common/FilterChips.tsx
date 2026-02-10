import { BackIcon, Reset } from "../../assets/icons";

export type FilterKey = "mood" | "style" | "immersion";

export type FilterChip = {
  key: FilterKey;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

interface FilterChipsProps {
  chips: FilterChip[];
  hasAnyFilter: boolean;
  onReset: () => void;
}

export function FilterChips({
  chips,
  hasAnyFilter,
  onReset,
}: FilterChipsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* 리셋 */}
      <button
        type="button"
        onClick={onReset}
        disabled={!hasAnyFilter}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 disabled:opacity-50"
      >
        <Reset className="h-4 w-4" />
      </button>

      {/* 칩 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {chips.map(({ key, label, isActive, onClick }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={[
              "inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-full border px-4 py-1",
              "text-body-01-m",
              isActive
                ? "bg-black text-white"
                : "border-gray-200 bg-bg text-gray-700",
            ].join(" ")}
          >
            <span>{label}</span>
            <BackIcon
              className={
                isActive
                  ? "h-3.5 w-3.5 rotate-270 text-white"
                  : "h-3.5 w-3.5 rotate-270 text-gray-700"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
