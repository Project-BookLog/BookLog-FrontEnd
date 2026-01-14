import { useState, useRef } from "react";
import LikeCard from "./LikeCard";

const LIKE_CARDS = [
  { id: 0, title: "작가", description: "한강 작가님의 새 작품을 확인해보세요." },
  { id: 1, title: "작가", description: "한강 작가님의 새 작품을 확인해보세요." },
  { id: 2, title: "장르", description: "요즘 (장르)에서 뜨고 있는 작품을 확인해보세요." },
  { id: 3, title: "분위기", description: "(분위기) 느낌의 인기 작품을 확인해보세요" },
];

function LikeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const startXRef = useRef<number | null>(null);

  const next = () =>
    setActiveIndex((i) =>
      i === LIKE_CARDS.length - 1 ? 0 : i + 1
    );
  const prev = () =>
    setActiveIndex((i) =>
      i === 0 ? LIKE_CARDS.length - 1 : i - 1
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
          {LIKE_CARDS.map((card) => (
            <div key={card.id} className="shrink-0 w-full px-4">
              <LikeCard title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {LIKE_CARDS.map((card, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={card.id}
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

export default LikeCarousel;
