import type { Author, Book } from "../../../types/book.types";
import { BackIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";

type BothResultsProps = {
  keyword: string;
  bookTotal: number;
  bookItems: Book[];
  authorTotal: number;
  authorItems: Author[];
  onBookMoreClick?: () => void;
  onAuthorMoreClick?: () => void;
};

export default function BothResults({
  bookTotal,
  bookItems,
  authorTotal,
  authorItems,
  onBookMoreClick,
  onAuthorMoreClick,
}: BothResultsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* 작가 */}
      <section>
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2 pl-5">
            <h2 className="text-title-02 text-black">작가</h2>
            <span className="text-caption-01 text-primary">{authorTotal}명</span>
          </div>

          {onAuthorMoreClick && (
            <button className="pr-6 text-gray-500" onClick={onAuthorMoreClick}>
              <BackIcon className="w-5 h-5 rotate-180" />
            </button>
          )}
        </header>

        <div className="flex gap-3 overflow-x-auto pb-1 pl-5 no-scrollbar">
          {authorItems.map((author) => (
            <button
              key={author.authorId}
              className="flex-shrink-0"
              onClick={() => navigate(`/author/${author.authorId}`)}
            >
              <div className="h-16 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {author.profileImageUrl ? (
                    <img
                      src={author.profileImageUrl}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">작가</span>
                  )}
                </div>

                <div className="flex flex-col items-start min-w-0">
                  <p className="text-subtitle-02-sb truncate">{author.name}</p>
                  <p className="text-caption-01 text-gray-600 truncate">
                    {author.occupation} │ {author.nationality ?? "미상"}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 도서 */}
      <section>
        <header className="mb-3 flex items-center justify-between px-5">
          <div className="flex items-baseline gap-2">
            <h2 className="text-title-02 text-black">도서</h2>
            <span className="text-caption-01 text-primary">{bookTotal}권</span>
          </div>

          {onBookMoreClick && (
            <button className="text-gray-500" onClick={onBookMoreClick}>
              <BackIcon className="h-5 w-5 rotate-180" />
            </button>
          )}
        </header>

        <div className="mb-10 space-y-3 px-5">
          {bookItems.map((book) => (
            <button
              key={book.bookId}
              className="flex w-full items-center gap-5"
              onClick={() => navigate(`/book/${book.bookId}`)}
            >
              <div className="h-26 w-17 rounded bg-gray-100 overflow-hidden">
                {book.thumbnailUrl ? (
                <img
                  src={book.thumbnailUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                ): null}
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-subtitle-02-sb truncate">{book.title}</p>
                <p className="text-caption-02 truncate text-gray-600">
                  {book.authors[0] ?? "저자 미상"}
                  <span className="text-gray-400"> | </span>
                  {book.publisherName}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}