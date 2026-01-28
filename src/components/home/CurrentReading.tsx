import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import type { CarouselInternalState } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BOOKS } from "../../data/book.mock";
import { Frame } from "../../assets/icons";

const CurrentReading: React.FC = () => {
  const length = BOOKS.length;
  const [activeIndex, setActiveIndex] = useState(0); 

  if (length === 0) {
    return (
      <div className="px-4">
        <p className="text-[18px] text-gray-700">
          현재 읽고 있는 책이 없습니다.
        </p>
      </div>
    );
  }

  const responsive = {
    all: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const handleAfterChange = (
    previousSlide: number,
    state: CarouselInternalState
  ) => {
    const { currentSlide } = state;
    const dataSize = BOOKS.length;

    let activeSlide = 0;

    if (previousSlide < currentSlide) {
      // 오른쪽->다음
      activeSlide = currentSlide - 2 === dataSize ? 0 : currentSlide - 2;
    } else {
      // 왼쪽->이전
      activeSlide =
        currentSlide +
        (currentSlide <= dataSize && currentSlide >= 2 ? -2 : dataSize - 2);
    }

    // BOOKS 범위 안으로 보정
    activeSlide = ((activeSlide % dataSize) + dataSize) % dataSize;
    setActiveIndex(activeSlide);
  };

  return (
    <div>
      <div className="px-5 mb-0">
        <div className="text-title-02 text-[#000000] pb-0 mb-0">
          지금 읽고 있는 책
        </div>
        <p className="text-body-03 text-gray-700 m-0">
          @@님이 현재 읽고 있는 책은{" "}
          <span className="text-primary">{BOOKS.length}권</span>
          이에요.
        </p>
      </div>

      <div className="mt-5">
        <Carousel
          responsive={responsive}
          infinite
          swipeable
          draggable
          centerMode
          arrows={false}
          showDots={false}
          keyBoardControl
          autoPlay={false}
          customTransition="transform 300ms ease-out"  
          transitionDuration={300}                    
          itemClass="px-2"
          afterChange={handleAfterChange}              
        >

          {BOOKS.map((book, index) => {
            const CoverIcon = book.CoverIcon;
            const isCenter = index === activeIndex;

            return (
              <div
                key={book.id}
                className={[
                  "flex flex-col items-center transition-all ease-out",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative w-30 h-45", 
                    "flex items-center justify-center",
                  ].join(" ")}
                >
                  <div className="w-full h-full rounded-sm overflow-hidden">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : CoverIcon ? (
                      <CoverIcon className="w-full h-full" />
                    ) : (
                      <span className="text-xs">No Image</span>
                    )}
                  </div>

                  <Frame 
                    className="pointer-events-none absolute bottom-0 right-0" 
                    style={{ 
                      transform: 'translateY(35px) translateX(31px)'
                    }}
                  />
                </div>



                {/* 책 정보 */}
                {isCenter && (
                  <div className="mt-7 w-30 text-center">
                    <p className="truncate text-subtitle-02-sb">
                      {book.title}
                    </p>

                    <p className="mt-0.5 truncate text-caption-02">
                      <span className="text-gray-600">{book.author}</span>
                      <span className="text-gray-400"> | </span>
                      <span className="text-gray-600">{book.publisher}</span>
                    </p>

                    <div className="mt-1.5 flex items-center w-35">
                      <div className="flex-1 h-4.5 rounded-sm bg-black/8 overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                      <span className="text-subtitle-02-sb ml-3">
                        {book.progress}
                      </span>
                      <span className="text-en-caption-02 pt-0.5 pl-0.25">%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default CurrentReading;
