import { BOOKS } from "../data/book.mock";
function Ranking() {
  return (
    <section className="px-6">
      {/* 타이틀 */}
      <div className="mb-3">
        <h2 className="text-[18px] font-semibold">실시간 랭킹</h2>
        <p className="text-[12px] text-gray-700">
          현재 북로그에서 인기있는 책이에요.
        </p>
      </div>

      {/* 가로 스크롤 리스트 */}
      <div className="-mx-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 px-4 ">
          {BOOKS.map((book, idx) => {
            const { id, title, author, publisher, CoverIcon } = book; // Book 타입 구조분해
            return (
              <div
                key={id}
                className={`w-27 flex-shrink-0 ${
                  idx === BOOKS.length - 1 ? "me-10" : ""
                }`}
              >
                {/* 책 이미지 */}
                <div className="w-full h-32.5 rounded-lg overflow-hidden flex items-center justify-center">
                  <CoverIcon className="w-full" />
                </div>

                {/* 책 정보 */}
                <div className="mt-2 space-y-0.5 flex space-around">
                  <div className="w-5">
                    <p className="text-[15px] font-semibold truncate">{id}</p>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold truncate">{title}</p>
                    <p className="text-[11px] text-gray-700 truncate">
                      {author} | {publisher}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Ranking;
