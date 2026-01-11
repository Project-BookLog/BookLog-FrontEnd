import type { Author } from "../../types/book.types";
import { BackIcon } from "../../assets/icons";

type AuthorResultsProps = {
  keyword: string;
  total: number;
  items: Author[];
  mode?: "compact" | "full";
  onMoreClick?: () => void;
};

function AuthorResults({
  total,
  items,
  mode = "compact",
  onMoreClick,
}: AuthorResultsProps) {
  const isCompact = mode === "compact";

  return (
    <section>
      {/* compact 헤더 */}
      {isCompact && (
        <header className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2 pl-6">
            <h2 className="text-title-02 text-black">작가</h2>
            <span className="text-caption-01 text-primary">{total}명</span>
          </div>

          {onMoreClick && (
            <button
              type="button"
              className="pr-6 text-gray-500"
              onClick={onMoreClick}
            >
              <BackIcon className="w-5 h-5 rotate-180" />
            </button>
          )}
        </header>
      )}


      {/* full 헤더 */}
      {!isCompact && (
        <div className="flex items-center justify-between px-6 mb-3">
          <p className="text-body-03 text-gray-600">
            총 <span className="text-primary">{total}</span>명
          </p>

          <button
            type="button"
            className="flex items-center gap-1 text-body-03 text-gray-600"
          >
            <span>최신순</span>
            <BackIcon className="w-4 h-4 rotate-270" />
            {/* 나중에 정렬 드롭다운 넣을 자리 */}
          </button>
        </div>
      )}

      <div
        className={
          isCompact
            ? "flex gap-3 overflow-x-auto pb-1 pl-6 no-scrollbar"
            : "space-y-3 px-4 pb-2"
        }
      >
        {items.map((author) => {
          const AvatarIcon = author.imageUrl;

          // compact
          if (isCompact) {
            return (
              <button
                key={author.id}
                type="button"
                className="flex-shrink-0"
              >
                <div className="h-16 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-gray-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                    {AvatarIcon && <AvatarIcon className="w-full h-full" />}
                  </div>

                  <div className="flex flex-col text-black items-start min-w-0">
                    <p className="text-subtitle-02-sb truncate">
                      {author.name}
                    </p>
                    <p className="text-caption-01 text-gray-600 truncate">
                      {author.role} │ {author.country}
                    </p>
                  </div>
                </div>
              </button>
            );
          }

          // full
          return (
            <button
              key={author.id}
              type="button"
              className="w-full text-left mb-4"
            >
              <div className="w-full rounded-2xl bg-gray-100 px-4 py-3">
                <div className="flex items-center gap-3 h-14 py-3 mb-2">
                  <div className="w-11.25 h-11.25 rounded-full overflow-hidden flex items-center justify-center">
                    {AvatarIcon && <AvatarIcon className="w-full h-full" />}
                  </div>

                  <div className="flex flex-col gap-1 text-black items-start min-w-0">
                    <p className="text-subtitle-02-sb truncate">
                      {author.name}
                    </p>
                    <p className="text-caption-01 text-gray-600 truncate">
                      {author.role} │ {author.country}
                    </p>
                  </div>
                </div>

                <hr className="border-t border-gray-200" />

                {author.books && author.books.length > 0 && (
                  
                  <div className="mt-3 h-14 flex justify-start gap-5">
                    {author.books.slice(0, 2).map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center gap-2 w-35"
                      >
                        <div className="w-8 h-11.25 rounded-md overflow-hidden flex items-center justify-center">
                          <book.CoverIcon className="w-full h-full" />
                        </div>

                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="text-subtitle-02-sb text-black line-clamp-2">
                            {book.title}
                          </p>
                          <p className="text-caption-02 text-gray-600 truncate">
                            {book.author}
                            <span className="text-gray-400 px-1"> | </span>
                            {book.publisher}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default AuthorResults;
