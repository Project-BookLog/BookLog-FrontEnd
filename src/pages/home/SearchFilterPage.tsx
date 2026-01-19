import { useNavigate, useSearchParams } from "react-router-dom";
import { useFilter } from "../../hooks/useFilter";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { useEffect } from "react";

const moods = ["따뜻한", "잔잔한", "유쾌한", "어두운", "서늘한", "몽환적인"] as const;
const styles = ["간결한", "화려한", "담백한", "섬세한", "직설적", "은유적"] as const;
const immersions = ["기분 전환", "지적인 탐구", "압도적 몰입", "짙은 여운"] as const;

function SearchFilterPage() {
  const { filter, toggleFilter } = useFilter();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hasAnyFilter =
    filter.mood.length > 0 || 
    filter.style.length > 0 || 
    filter.immersion.length > 0;

  const handleApply = () => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", "book");
    
    // 필터 상태 URL에 저장 
    if (filter.mood.length > 0) {
      next.set("mood", filter.mood.join(","));
    }
    if (filter.style.length > 0) {
      next.set("style", filter.style.join(","));
    }
    if (filter.immersion.length > 0) {
      next.set("immersion", filter.immersion.join(","));
    }
    
    navigate(`/search?${next.toString()}`);
  };

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
          onBack={() => history.back()}
        />
      </header>

      <main className="flex-1 px-6 pt-4 pb-4 space-y-10">
        {/* 분위기 */}
        <section>
          <p className="mb-3 text-title-02 text-[#000000]">분위기</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => {
              const active = filter.mood.includes(m);
              return (
                <button
                  key={m}
                  onClick={() => toggleFilter("mood", m)}
                  className={
                    "h-9 rounded-full px-3 py-1.5 text-body-01-m " +
                    (active
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black")
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
                  onClick={() => toggleFilter("style", s)}
                  className={
                    "h-9 rounded-full px-3 py-1.5 text-body-01-m " +
                    (active
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black")
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
                  onClick={() => toggleFilter("immersion", i)}
                  className={
                    "h-9 rounded-full px-3 py-1.5 text-body-01-m " +
                    (active
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black")
                  }
                >
                  {i}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* 적용 버튼 */}
      <div className="fixed inset-x-0 bottom-0 pb-safe">
        <div className="mx-auto w-full max-w-sm px-6 pb-4">
          <button
            className={
              "w-full rounded-lg py-3 h-13 text-subtitle-02-sb " +
              (hasAnyFilter
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600")
            }
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

export default SearchFilterPage;
