import type { RealTimeRankingBook } from "../../types/home/home.types";
import { useNavigate } from "react-router-dom";

interface RankingProps {
  books: RealTimeRankingBook[];
}

const truncateText = (
  text: string | null,
  visibleLength: number,
  fallback = "-"
) => {
  if (!text) return fallback;

  // visibleLength까지는 그대로
  if (text.length <= visibleLength) return text;

  // 초과 시: (visibleLength - 1) + ...
  return text.slice(0, visibleLength - 1) + "...";
};


const formatAuthor = (author: string | null) => {
  if (!author) return "-";

  const firstAuthor = author.split(",")[0].trim();
  return truncateText(firstAuthor, 4);
};



function Ranking({ books }: RankingProps) {
  const navigate = useNavigate();
  const handleClickBook = (bookId: number) => {
    navigate(`/book/${bookId}`);
  }
  
  return (
    <section className="px-5">
      {/* 타이틀 */}
      <div className="mb-3">
        <h2 className="text-title-02 text-[#000000]">실시간 랭킹</h2>
        <p className="text-body-03 text-gray-700">
          현재 북로그에서 인기있는 책이에요.
        </p>
      </div>

      {/* 가로 스크롤 리스트 */}
      <div className="-mx-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 px-5 ">
          {books.map((book, idx) => {
            return (
              <div
                key={book.bookId}
                onClick={()=> handleClickBook(book.bookId)}
                className={`w-27 flex-shrink-0 ${
                  idx === books.length - 1 ? "me-10" : ""
                }`}
              >
                {/* 책 이미지 */}
                <div className="w-full h-32.5 rounded-lg overflow-hidden flex items-center justify-center">
                  {book.coverImageUrl ? (
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* 책 정보 */}
                <div className="mt-2 space-y-0.5 flex space-around">
                  <div className="w-5">
                    <p className="text-subtitle-02-sb text-black truncate">{book.ranking}</p>
                  </div>
                  <div>
                    <p className="text-subtitle-02-sb text-black truncate">{truncateText(book.title, 7)}</p>
                    <p className="text-caption-02 text-gray-700 truncate">
                      {formatAuthor(book.author)?? "-"}<span className="text-gray-500"> | </span>{truncateText(book.publisher, 4) ?? "-"}
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
