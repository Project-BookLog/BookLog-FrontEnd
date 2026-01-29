import type { Author } from "../../../types/book.types";
import { useNavigate } from "react-router-dom";

type AuthorResultsProps = {
  total: number;
  items: Author[];
};

export default function AuthorResults({
  total,
  items,
}: AuthorResultsProps) {
  const navigate = useNavigate();

  const handleAuthorClick = (authorId: string | number) => {
    navigate(`/author/${authorId}`);
  };

  return (
    <section>
      {/* full 헤더 */}
      <div className="flex items-center justify-between px-6 mb-3">
        <p className="text-body-03 text-gray-600">
          총 <span className="text-primary">{total}</span>명
        </p>
      </div>

      {/* full 리스트 */}
      <div className="space-y-3 px-4 pb-2">
        {items.map((author) => {
          const AvatarIcon = author.imageUrl;

          return (
            <button
              key={author.id}
              type="button"
              className="w-full text-left mb-4"
              onClick={() => handleAuthorClick(author.id)}
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
