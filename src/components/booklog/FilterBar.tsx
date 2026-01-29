import FilterChip from "./FilterChip";
import { useFilter } from "../../hooks/useFilter";
import type { FilterScope } from "../../context/FilterContext";

type Props = {
  scope: FilterScope;

  // ✅ src 문자열 제거 → React SVG 컴포넌트로 받기
  ResetIcon: React.ComponentType<{ className?: string }>;

  onReset?: () => void;

  onClickMood?: () => void;
  onClickStyle?: () => void;
  onClickImmersion?: () => void;
};

function toChipLabel(base: string, selected: string[]) {
  if (!selected || selected.length === 0) return base;
  if (selected.length === 1) return selected[0];
  return `${selected[0]} +${selected.length - 1}`;
}

export default function FilterBar({
  scope,
  ResetIcon,
  onReset,
  onClickMood,
  onClickStyle,
  onClickImmersion,
}: Props) {
  const { filter } = useFilter(scope);

  const moodLabel = toChipLabel("분위기", filter.mood);
  const styleLabel = toChipLabel("문체", filter.style);
  const immersionLabel = toChipLabel("몰입도", filter.immersion);

  const moodActive = filter.mood.length > 0;
  const styleActive = filter.style.length > 0;
  const immersionActive = filter.immersion.length > 0;

  return (
    <section className="px-4">
      <div className="py-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 grid h-[36px] w-[36px] place-items-center rounded-full bg-[#EFEDEB]"
            aria-label="필터 초기화"
          >
            <ResetIcon className="h-[18px] w-[18px] text-black" />
          </button>

          <div
            className="
              flex-1
              overflow-x-auto
              whitespace-nowrap
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div className="inline-flex items-center gap-2 pr-2">
              <FilterChip
                label={moodLabel}
                active={moodActive}
                onClick={onClickMood}
              />
              <FilterChip
                label={styleLabel}
                active={styleActive}
                onClick={onClickStyle}
              />
              <FilterChip
                label={immersionLabel}
                active={immersionActive}
                onClick={onClickImmersion}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
