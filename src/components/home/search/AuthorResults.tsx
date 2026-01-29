import { useNavigate } from "react-router-dom";
import type { Author } from "../../../types/book.types";

export default function AuthorResults({
  total,
  items,
}: {
  total: number;
  items: Author[];
}) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="px-6 mb-3 text-body-03 text-gray-600">
        총 <span className="text-primary">{total}</span>명
      </div>

      <div className="space-y-3 px-4 pb-2">
        {items.map((author) => (
          <button
            key={author.authorId}
            className="w-full text-left mb-4"
            onClick={() => navigate(`/author/${author.authorId}`)}
          >
            <div className="rounded-2xl bg-gray-100 px-4 py-3">
              <div className="flex items-center gap-3 h-14 py-3 mb-2">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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

                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-subtitle-02-sb truncate">{author.name}</p>
                  <p className="text-caption-01 text-gray-600 truncate">
                    {author.occupation} 
                    {author.nationality &&` │ ${author.nationality}`}
                  </p>
                </div>
              </div>

              {author.books && author.books.length > 0 && (
                <>
                  <hr className="border-t border-gray-200" />
                  <div className="mt-3 flex justify-between gap-5">
                    {author.books.slice(0, 2).map((book) => (
                      <div key={book.bookId} className="flex gap-[10px] w-35">
                        <img
                          src={book.thumbnailUrl}
                          alt="책 표지"
                          className="w-[30px] h-[45px] rounded-md object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-subtitle-02-sb line-clamp-2">
                            {book.title}
                          </p>
                          <p className="text-caption-02 truncate text-gray-600">
                            {book.authors}
                            <span className="text-gray-400 px-1">|</span>
                            {book.publisherName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
