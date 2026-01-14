import FilterChip from "./FilterChip";

type Props = {
  resetSrc: string;
  onReset?: () => void;

  onClickMood?: () => void;
  onClickStyle?: () => void;
  onClickImmersion?: () => void;
};

export default function FilterBar({
  resetSrc,
  onReset,
  onClickMood,
  onClickStyle,
  onClickImmersion,
}: Props) {
  return (
    <section className="px-4">
      {/* 배경은 살짝만 깔리게 */}
      <div className="py-2">
        <div className="flex items-center gap-2">
          {/* 좌측 새로고침 버튼 (작게) */}
          <button
            type="button"
            onClick={onReset}
            className="grid h-[36px] w-[36px] place-items-center rounded-full bg-[#EFEDEB]"
            aria-label="필터 초기화"
          >
            <img
              src={resetSrc}
              alt=""
              className="h-[18px] w-[18px]"
              draggable={false}
            />
          </button>

          {/* 우측 칩들 */}
          <div className="flex items-center gap-2">
            <FilterChip label="분위기" onClick={onClickMood} />
            <FilterChip label="문체" onClick={onClickStyle} />
            <FilterChip label="몰입도" onClick={onClickImmersion} />
          </div>
        </div>
      </div>
    </section>
  );
}