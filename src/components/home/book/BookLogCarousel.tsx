import { BOOKLOGS } from "../../../data/booklog.mock";
import BookLogCard from "./BookLogCard";

function BookLogCarousel() {
  return (
    <section className="px-6">
      {/* 타이틀 */}
      <div className="mb-3">
        <p className="text-title-02">북로그</p>
      </div>

      {/* 가로 스크롤 리스트 */}
      <div className="-mx-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 px-4 ">
          {BOOKLOGS.map((booklog, idx) => (
            <BookLogCard
              key={booklog.id}
              {...booklog}
              isLast={idx === BOOKLOGS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookLogCarousel;
