import type { Book, Author } from "../../../types/book.types";
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
  keyword, // eslint-disable-line @typescript-eslint/no-unused-vars
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
      {/* compact 작가 */}
      <section>
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2 pl-5">
            <h2 className="text-title-02 text-black">작가</h2>
            <span className="text-caption-01 text-primary">
              {authorTotal}명
            </span>
          </div>

          {onAuthorMoreClick && (
            <button
              type="button"
              className="pr-6 text-gray-500"
              onClick={onAuthorMoreClick}
            >
              <BackIcon className="w-5 h-5 rotate-180" />
            </button>
          )}
        </header>

        <div className="flex gap-3 overflow-x-auto pb-1 pl-5 no-scrollbar">
          {authorItems.map((author) => (
            <button
              key={author.id}
              type="button"
              className="flex-shrink-0"
              onClick={() => navigate(`/author/${author.id}`)}
            >
              <div className="h-16 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  {author.imageUrl && (
                    <author.imageUrl className="w-full h-full" />
                  )}
                </div>

                <div className="flex flex-col items-start min-w-0 text-black">
                  <p className="text-subtitle-02-sb truncate">
                    {author.name}
                  </p>
                  <p className="text-caption-01 text-gray-600 truncate">
                    {author.role} │ {author.country}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* compact 도서 */}
      <section>
        <header className="mb-3 flex items-center justify-between px-5">
          <div className="flex items-baseline gap-2">
            <h2 className="text-title-02 text-black">도서</h2>
            <span className="text-caption-01 text-primary">
              {bookTotal}권
            </span>
          </div>

          {onBookMoreClick && (
            <button
              type="button"
              className="text-gray-500"
              onClick={onBookMoreClick}
            >
              <BackIcon className="h-5 w-5 rotate-180" />
            </button>
          )}
        </header>

        <div className="mb-10 space-y-3 px-5">
          {bookItems.map((book) => (
            <button
              key={book.id}
              type="button"
              className="flex w-full items-center gap-5"
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className="flex h-26 w-17 items-center justify-center overflow-hidden rounded">
                <book.CoverIcon className="h-full w-full" />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-subtitle-02-sb truncate">
                  {book.title}
                </p>
                <p className="text-caption-02 truncate text-gray-600">
                  {book.author}
                  <span className="text-gray-400"> | </span>
                  {book.publisher}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
