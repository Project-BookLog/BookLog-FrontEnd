import type {
  FilterState,
  Mood,
  Style,
  Immersion,
} from "../../context/FilterContext";

const moods = [
  "따뜻한",
  "잔잔한",
  "유쾌한",
  "어두운",
  "서늘한",
  "몽환적인",
] as const;
const styles = [
  "간결한",
  "화려한",
  "담백한",
  "섬세한",
  "직설적",
  "은유적",
] as const;
const immersions = [
  "기분 전환",
  "지적인 탐구",
  "압도적 몰입",
  "짙은 여운",
] as const;

type FilterKey = keyof FilterState;
type FilterValue = Mood | Style | Immersion;

type Props = {
  filter: FilterState;
  onToggle: (key: FilterKey, value: FilterValue) => void;
  className?: string;
};

export default function BookFilterSections({
  filter,
  onToggle,
  className = "",
}: Props) {
  return (
    <div className={["space-y-10", className].join(" ").trim()}>
      {/* 분위기 */}
      <section>
        <p className="mb-3 text-title-02 text-[#000000]">분위기</p>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => {
            const active = filter.mood.includes(m);
            return (
              <button
                key={m}
                onClick={() => onToggle("mood", m)}
                className={
                  "h-9 rounded-full px-3 py-1.5 text-body-01-m " +
                  (active ? "bg-black text-white" : "bg-gray-100 text-black")
                }
              >
                {m}
              </button>
            );
          })}
        </div>
      </section>

      {/* 문체 */}
      <section>
        <p className="mb-3 text-title-02 text-[#000000]">문체</p>
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => {
            const active = filter.style.includes(s);
            return (
              <button
                key={s}
                onClick={() => onToggle("style", s)}
                className={
                  "h-9 rounded-full px-3 py-1.5 text-body-01-m " +
                  (active ? "bg-black text-white" : "bg-gray-100 text-black")
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </section>

      {/* 몰입도 */}
      <section className="mb-0 pb-0">
        <p className="mb-3 text-title-02 text-[#000000]">몰입도</p>
        <div className="flex flex-wrap gap-2">
          {immersions.map((i) => {
            const active = filter.immersion.includes(i);
            return (
              <button
                key={i}
                onClick={() => onToggle("immersion", i)}
                className={
                  "h-9 rounded-full px-3 py-1.5 text-body-01-m " +
                  (active ? "bg-black text-white" : "bg-gray-100 text-black")
                }
              >
                {i}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
