
import type { Book } from "../../types/book.types";
import { BackIcon } from "../../assets/icons";

type BookResultsProps = {
  keyword: string;
  total: number;
  items: Book[];
  mode?: "compact" | "full";
  onMoreClick?: () => void;
};

function BookResults({
  keyword,
  total,
  items,
  mode = "compact",
  onMoreClick,
}: BookResultsProps) {
  const showMoreButton = mode === "compact" && total > items.length;

  return (
    <section className="px-6">
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-title-02 text-black">도서</h2>
          <span className="text-caption-01 text-primary">{total}권</span>
        </div>

        {showMoreButton && (
          <button
            type="button"
            className="text-xs text-gray-500"
            onClick={onMoreClick}
          >
            <BackIcon className="w-5 h-5 rotate-180" />
          </button>
        )}
      </header>

      <div className="space-y-3">
        {items.map((book) => {
          const { CoverIcon } = book;

          return (
            <button
              key={book.id}
              type="button"
              className="w-full flex items-center gap-5"
            >
              <div className="w-17 h-26 overflow-hidden rounded flex items-center justify-center">
                <CoverIcon className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-subtitle-02-sb truncate">{book.title}</p>
                <p className="text-caption-02 text-gray-600 truncate">
                  {book.author}
                  <span className="text-gray-400"> | </span>
                  {book.publisher}
                </p>

              </div>
            </button>
          );
        })}
      </div>

      {mode === "full" && (
        <p className="mt-3 text-xs text-gray-400">
          ‘{keyword}’ 검색 결과 도서 {total}권
        </p>
      )}
    </section>
  );
}

export default BookResults;
