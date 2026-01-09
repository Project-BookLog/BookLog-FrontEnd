import React, { useState, useRef, useCallback } from "react";
import { BOOKS } from "../../data/book.mock";

// 유틸: 원형 인덱스
function getCircularIndex(index: number, length: number): number {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

const SWIPE_THRESHOLD = 40; //40px만큼 움직이면 페이지 전환

const CurrentReading: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // 센터 인덱스

  // 터치/마우스 시작 지점을 저장할 ref (렌더 중 접근X)
  const pointerStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const length = BOOKS.length;

  const goToNext = useCallback(() => {
    if (length <= 0) return;
    setCurrentIndex((prev) => getCircularIndex(prev + 1, length));
  }, [length]);

  const goToPrev = useCallback(() => {
    if (length <= 0) return;
    setCurrentIndex((prev) => getCircularIndex(prev - 1, length));
  }, [length]);

  // 시작
  const handlePointerDown = (
    clientX: number,
  ) => {
    pointerStartXRef.current = clientX;
    isDraggingRef.current = true;
  };

  // 끝
  const handlePointerUp = (
    clientX: number | null,
  ) => {
    if (!isDraggingRef.current || pointerStartXRef.current == null) {
      isDraggingRef.current = false;
      pointerStartXRef.current = null;
      return;
    }

    if (clientX != null) {
      const deltaX = clientX - pointerStartXRef.current;

      if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        if (deltaX > 0) {   //오른쪽 -> 이전
          goToPrev();
        } else {              //왼쪽 -> 다음
          goToNext();
        }
      }
    }

    isDraggingRef.current = false;
    pointerStartXRef.current = null;
  };

  // 마우스 이벤트
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handlePointerDown(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerUp(e.clientX);
  };

  const onMouseLeave = () => {
    handlePointerUp(null); // 드래그하다가 영역 밖으로 나간 경우도 종료 처리
  };

  // 터치 이벤트
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handlePointerDown(touch.clientX);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    handlePointerUp(touch?.clientX ?? null);
  };

  // 중앙 기준 -2 ~ +2 오프셋 범위만 렌더 (무한 캐러셀 느낌)
  const offsets = [-2, -1, 0, 1, 2];

  if (length === 0) {
    return (
      <div className="px-4">
        <p className="text-sm text-slate-500">
          현재 읽고 있는 책이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div >
      <div className="px-4 mb-0">
        <div className="text-[16px] font-medium pb-0 mb-0">
          지금 읽고 있는 책
        </div>
        <p className="text-[12px] text-gray-700 m-0">
          @@님이 현재 읽고 있는 책은{" "}
          <span className="text-primary">{BOOKS.length}권</span>
          이에요.
        </p>
      </div>



      <div
        className="relative select-none"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* 캐러셀 라인 */}
        <div className="flex items-center justify-center gap-15 overflow-hidden mt-5">
          {offsets.map((offset) => {
            const bookIndex = getCircularIndex(currentIndex + offset, length);
            const book = BOOKS[bookIndex];
            const isCenter = offset === 0;
            const CoverIcon = book.CoverIcon;

            return (
              <div
                key={`${book.id}-${offset}`}
                className={[
                  "transition-all duration-200 ease-out",
                  "flex flex-col items-center",
                  isCenter ? "z-20" : "z-10",
                  isCenter ? "opacity-100" : "opacity-60",
                ].join(" ")}
              >
                {/* 여기: 이미지 래퍼 */}
                <div
                  className={[
                    "w-30 h-45 rounded-sm overflow-hidden",
                    "flex items-center justify-center",
                    isCenter ? "shadow-slate-400" : "shadow-slate-300",
                    // 애니메이션 추가
                    "transition-transform duration-300 ease-out",
                    isCenter ? "scale-100 translate-y-0" : "scale-90 translate-y-1",
                  ].join(" ")}
                >
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : CoverIcon ? (
                    <CoverIcon className="h-full w-full text-slate-70" />
                  ) : (
                    <span className="text-xs text-slate-500">No Image</span>
                  )}
                </div>

                {/* 책 정보 */}
                <div
                  className={[
                    "mt-7 w-30 text-center transition-opacity duration-200",
                    isCenter ? "opacity-100" : "opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  <p className="truncate text-[15px] font-medium">
                    {book.title}
                  </p>

                  <p className="mt-0.5 truncate text-[11px]">
                    <span className="text-gray-600">{book.author}</span>
                    <span className="text-gray-400"> | </span>
                    <span className="text-gray-600">{book.publisher}</span>
                  </p>

                  {/* progress */}
                  <div className="mt-1.5 flex items-center w-35">
                    <div className="flex-1 h-4.5 rounded-sm bg-black/8 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <span className="text-[16px] font-medium ml-3">
                      {book.progress}
                    </span>
                    <span className="text-[11px] pt-0.5 pl-0.25">%</span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>


      </div>
    </div>
  );
};

export default CurrentReading;
