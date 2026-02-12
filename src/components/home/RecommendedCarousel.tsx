import { useState, useRef, useEffect } from "react";
import RecommendedCard from "./RecommendedCard";
import { getRecommendations } from "../../api/home/home";
import type { RecommendationSection } from "../../types/home/home.types";
import { useGetUserBookList } from "../../hooks/queries/useGetUserBookList";

function RecommendedCarousel() {
  const [sections, setSections] = useState<RecommendationSection[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const { data } = useGetUserBookList();

  const hasBooks = (data?.items?.length ?? 0) > 0;

  useEffect(() => {
    getRecommendations()
      .then((res) => {
        const rawSections = [
          res.authorSection,
          res.genreSection,
          res.moodSection,
        ];

        setSections(rawSections);
      })
      .catch((err) => {
        console.error("추천 불러오기 실패", err);
      });
  }, []);

  const next = () =>
    setActiveIndex((i) =>
      i === sections.length - 1 ? 0 : i + 1
    );
  const prev = () =>
    setActiveIndex((i) =>
      i === 0 ? sections.length - 1 : i - 1
    );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startXRef.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startXRef.current;

    const THRESHOLD = 40; // 40px 드래그 시 이동 
    if (diff > THRESHOLD) prev();      // 오른쪽 -> 이전
    else if (diff < -THRESHOLD) next(); // 왼쪽 -> 다음 

    startXRef.current = null;
  };

  return (
    <section className="w-full max-w-md mx-auto">
      {/* 카드 슬라이더 */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {sections
            .map((section, index) => {
              const titleMap = hasBooks ? ["작가", "장르", "분위기"] : ["분위기", "문체", "몰입도"];
              return { section, title: titleMap[index] };
            })
            .filter(({ section }) => section.books.length > 0)
            .map(({ section, title }) => {
              const book = section.books[0];

              let description = "";

              switch (title) {
                case "작가":
                  description = `${book.author} 작가님의 새 작품을 확인해보세요.`;
                  break;
                case "장르":
                  description = `요즘 ${book.keyword2}에서 뜨고 있는 작품을 확인해보세요.`;
                  break;
                case "분위기":
                  description = `${book.keyword3} 느낌의 인기 작품을 확인해보세요.`;
                  break;
                case "문체":
                  description = `${book.styleKeyword} 느낌의 인기 작품을 확인해보세요.`;
                  break;
                case "몰입도":
                  description = `${book.immersionKeyword} 느낌의 인기 작품을 확인해보세요.`;
                  break;
              }

              return (
                <div key={section.title} className="shrink-0 w-full px-4">
                  <RecommendedCard title={title} description={description} book={book} />
                </div>
              );
            })
          }
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {sections.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={
                isActive
                  ? "h-1.5 w-6 rounded-full bg-black transition-all"
                  : "h-1.5 w-1.5 rounded-full bg-black/16 transition-all"
              }
            />
          );
        })}
      </div>
    </section>
  );
}

export default RecommendedCarousel;
