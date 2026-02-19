import React, { useEffect, useState } from "react";
import { Frame, Default_BookImg } from "../../assets/icons";
import Carousel from "react-multi-carousel";
import type { CarouselInternalState } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

import { getCurrentReadingBooks } from "../../api/home/home";
import type { CurrentReadingBook } from "../../types/home/home.types";

type Props = {
  username: string;
};

const CurrentReading: React.FC<Props> = ({ username }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<CurrentReadingBook[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); 

  const handleClickBook = (userBookId: number) => {
    navigate(`/my-library/book-detail/${userBookId}`);
  }

  useEffect(() => {
    getCurrentReadingBooks()
      .then((res) => setBooks(res.items))
      .catch(() => setBooks([]));
  }, []);
  
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
    const dataSize = books.length;

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

    // 범위 안으로 보정
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
          {username ? `${username}님이 현재 읽고 있는 책은 ` : "현재 읽고 있는 책은 "}
          <span className="text-primary">{books.length}권</span>
          이에요.
        </p>
      </div>

      <div className="mt-5">
        {books.length === 0 ? (
          <div className="flex flex-col items-center text-center py-8">
            <p className="text-subtitle-01-sb text-gray-900">
              아직 책장이 비어 있어요.
            </p>
            <p className="text-body-03 text-gray-600 mt-2">
              한 권만 놓아도, 이 공간은 달라져요.
            </p>
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            infinite={books.length > 1}
            swipeable={books.length > 1}
            draggable={books.length > 1}
            centerMode={books.length > 1}
            arrows={false}
            showDots={false}
            keyBoardControl
            autoPlay={false}
            customTransition="transform 300ms ease-out"
            transitionDuration={300}
            itemClass="px-2"
            afterChange={handleAfterChange}
          >

          {books.map((book, index) => {
            const isCenter = index === activeIndex;

            return (
              <div
                key={book.userBookId}
                className={[
                  "flex flex-col items-center transition-all ease-out",
                ].join(" ")}

                onClick={() => {
                  if (isCenter) {
                    handleClickBook(book.userBookId);
                  }
                }}
              >
                <div
                  className={[
                    "relative w-30 h-45", 
                    "flex items-center justify-center",
                  ].join(" ")}
                >
                  <div className="w-full h-full rounded-sm overflow-hidden">
                    {book.thumbnailUrl ? (
                      <img
                        src={book.thumbnailUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <Default_BookImg className="w-full h-full object-cover" />
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
                      <span className="text-gray-600">{book.authorName}</span>
                      <span className="text-gray-400"> | </span>
                      <span className="text-gray-600">{book.publisherName}</span>
                    </p>

                    <div className="mt-1.5 flex items-center w-35">
                      <div className="flex-1 h-4.5 rounded-sm bg-black/8 overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${book.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-subtitle-02-sb ml-3">
                        {book.progressPercent}
                      </span>
                      <span className="text-en-caption-02 pt-0.5 pl-0.25">%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Carousel>
        )}
      </div>
    </div>
  );
};

export default CurrentReading;
