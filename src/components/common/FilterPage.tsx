import { useNavigate, useSearchParams } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
import NavBarTop from "../common/navbar/NavBarTop";
import { useCallback, useEffect } from "react";
import type { FilterScope } from "../../context/FilterContext";

const moods = ["따뜻한", "잔잔한", "유쾌한", "어두운", "서늘한", "몽환적인"] as const;
const styles = ["간결한", "화려한", "담백한", "섬세한", "직설적", "은유적"] as const;
const immersions = ["기분 전환", "지적인 탐구", "압도적 몰입", "짙은 여운"] as const;

type Props = {
  scope: FilterScope;
};

export default function FilterPage({ scope }: Props) {
  const { filter, toggleFilter, pageInfo } = useFilter(scope);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hasAnyFilter =
    filter.mood.length > 0 ||
    filter.style.length > 0 ||
    filter.immersion.length > 0;

  const handleApply = useCallback(() => {
    const preserveKeys = pageInfo?.preserveQuery || ['q'];
    const returnUrl = pageInfo?.returnUrl || '/search';

    const params = new URLSearchParams();
    
    preserveKeys.forEach(key => {
      if (searchParams.has(key)) {
        params.set(key, searchParams.get(key)!);
      }
    });

    
    if (searchParams.has('tab')) {
      params.set('tab', searchParams.get('tab')!);
    }

    if (filter.mood.length > 0) {
      params.set("mood", filter.mood.join(","));
    }
    if (filter.style.length > 0) {
      params.set("style", filter.style.join(","));
    }
    if (filter.immersion.length > 0) {
      params.set("immersion", filter.immersion.join(","));
    }

    navigate(`${returnUrl}?${params.toString()}`);
  }, [filter, searchParams, pageInfo, navigate]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <header>
        <NavBarTop
          title="필터"
          onBack={() => window.history.back()}
        />
      </header>

      <main className="flex-1 px-6 pt-4 pb-4 space-y-10">
        <section>
          <p className="mb-3 text-title-02 text-[#000000]">분위기</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => {
              const active = filter.mood.includes(m);
              return (
                <button
                  key={m}
                  onClick={() => toggleFilter("mood", m)}
                  className={`h-9 rounded-full px-3 py-1.5 text-body-01-m transition-colors ${
                    active
                      ? "bg-black text-white shadow-sm"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <p className="mb-3 text-title-02 text-[#000000]">문체</p>
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => {
              const active = filter.style.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleFilter("style", s)}
                  className={`h-9 rounded-full px-3 py-1.5 text-body-01-m transition-colors ${
                    active
                      ? "bg-black text-white shadow-sm"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <p className="mb-3 text-title-02 text-[#000000]">몰입도</p>
          <div className="flex flex-wrap gap-2">
            {immersions.map((i) => {
              const active = filter.immersion.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleFilter("immersion", i)}
                  className={`h-9 rounded-full px-3 py-1.5 text-body-01-m transition-colors ${
                    active
                      ? "bg-black text-white shadow-sm"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {i}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 pb-safe">
        <div className="mx-auto w-full max-w-sm px-6 pb-4">
          <button
            className={`w-full rounded-lg py-3 h-13 text-subtitle-02-sb transition-all ${
              hasAnyFilter
                ? "bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary-dark active:scale-[0.98]"
                : "bg-gray-200 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!hasAnyFilter}
            onClick={handleApply}
          >
            필터 적용
          </button>
        </div>
      </div>
    </div>
  );
}
