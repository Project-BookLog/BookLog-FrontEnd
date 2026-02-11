import type { AuthorBook } from "../../../types/home/detail.types";
import { Default_BookImg } from "../../../assets/icons";

type Props = {
  books: AuthorBook[];
};

export default function AuthorBookBrief({ books }: Props) {
  if (!books || books.length === 0) return null;

  return (
    <section className="w-full bg-gray-100 rounded-[12px]">
      <div className="p-3">
        <div className="flex gap-4 overflow-x-auto no-scrollbar w-full">
          {books.slice(0, 3).map((book) => (
            <div
              key={book.bookId}
              className="flex items-center gap-[10px] flex-shrink-0"
            >
              <div className="w-[30px] h-[45px] rounded-[4px] overflow-hidden">
                {book.thumbnailUrl ? (
                  <img
                    src={book.thumbnailUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Default_BookImg className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <p className="text-subtitle-02-sb text-black line-clamp-2">
                  {book.title ?? "-"}
                </p>
                <p className="text-caption-02 text-gray-600 truncate">
                  {book.authorName ?? "-"}
                  <span className="text-gray-400 px-1"> | </span>
                  {book.publisherName ?? "-"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
