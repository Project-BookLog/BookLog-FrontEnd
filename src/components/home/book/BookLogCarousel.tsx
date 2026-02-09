import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookRelatedBooklogs } from "../../../api/home/detail";
import type { BookRelatedBooklog } from "../../../types/home/detail.types";
import BookLogCard from "./BookLogCard";

import { LoadingPage } from "../../../pages/onboarding/LoadingPage";
// import { ErrorPage } from "../../../pages/onboarding/ErrorPage";


function BookLogCarousel() {
  const { bookId } = useParams<{ bookId: string }>();
  const [logs, setLogs] = useState<BookRelatedBooklog []>([]);
  const [isLoading, setIsLoading] = useState(true);
console.log("BookDetailPage render", { isLoading, bookId });

  useEffect(() => {
    if (!bookId) return;

    getBookRelatedBooklogs(Number(bookId))
      .then(res => {
        console.log(res.items);
        setLogs(res.items);
      })
      .finally(() => setIsLoading(false));
  }, [bookId]);

  if (isLoading) return <LoadingPage />;


  return (
    <section className="px-6">
      {/* 타이틀 */}
      <div className="mb-3">
        <p className="text-title-02">북로그</p>
      </div>

      {/* 가로 스크롤 리스트 */}
      <div className="-mx-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 px-4 ">
          {logs.map((booklog, idx) => (
            <BookLogCard
              key={booklog.postId}
              {...booklog}
              isLast={idx === logs.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookLogCarousel;
