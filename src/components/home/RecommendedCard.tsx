import { useNavigate } from "react-router-dom";
import { CircleArrow, Default_BookImg } from "../../assets/icons";
import type { RecommendationBook } from "../../types/home/home.types";

type LikeCardProps = {
  title: string;
  description: string;
  book: RecommendationBook;
};

function RecommendedCard({ title, description, book }: LikeCardProps) {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl bg-slate-900 text-white px-6 py-5 mt-2 mx-1 overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 opacity-90 blur-[80px] pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          {book.thumbnailUrl ? (
            <img
              src={book.thumbnailUrl}
              alt={book.bookTitle}
              className="w-[170%] h-[170%]"
            />
          ) : (
            <Default_BookImg className="w-[170%] h-[170%]" />
          )}
        </div>
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-[#000000]/50 pointer-events-none" />

      {/* 이동 버튼 */}
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-[12px] bg-black/20 p-1"
        onClick={() => {
          if (!book.bookId) return;
          navigate(`/book/${book.bookId}`)
        }}
      >
        <CircleArrow className="w-8 h-8" />
      </button>

      {/* 내용 */}
      <div className="relative">
        {/* 타이틀 */}
        <div className="text-subtitle-01-sb">
          내가 좋아하는 {title}
        </div>
        <div className="text-body-03 text-gray-300">
          {description}
        </div>

        <div className="flex flex-col items-center gap-3">
          {book.thumbnailUrl ? (
            <img
              src={book.thumbnailUrl}
              alt={book.bookTitle}
              className="w-[92px] h-35 mt-3 object-cover rounded"
            />
          ) : (
            <Default_BookImg className="w-[92px] h-35 mt-3" />
          )}

          {/* 정보 */}
          <div className="w-full">
            <div className="text-center mb-2">
              <div className="text-subtitle-02-sb">{book.bookTitle}</div>
              <div className="text-caption-02 text-gray-200">
                {book.author} 저<span className="text-gray-400"> | </span>{book.publisher}
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap justify-center gap-2 mb-2 mt-3 text-caption-02">
              {[book.moodKeyword, book.styleKeyword, book.immersionKeyword]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1.5 rounded-[4px] bg-white/12 text-caption-02 text-white"
                  >
                    {tag}
                  </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendedCard;
