import { useNavigate } from "react-router-dom";
import type { Book } from "../../../types/book.types";

type Props = {
  total: number;
  items: Book[];
};

export default function BookResults({ total, items }: Props) {
  const navigate = useNavigate();

  return (
    <section className="relative bg-bg">
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between px-5">
        <p className="text-body-03 text-gray-600">
          총 <span className="text-primary">{total}</span>권
        </p>
      </div>

      {/* 리스트 */}
      <div className="mb-10 space-y-3 px-5">
        {items.map((book) => (
          <button
            key={book.bookId}
            type="button"
            className="flex w-full items-center gap-5"
            onClick={() => navigate(`/book/${book.bookId}`)}
          >
            <div className="flex h-26 w-17 items-center justify-center overflow-hidden rounded bg-gray-100">
              {book.thumbnailUrl && (
                <img
                  src={book.thumbnailUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="text-subtitle-02-sb truncate">{book.title}</p>
              <p className="text-caption-02 truncate text-gray-600">
                {book.authors?.[0] ?? "저자 미상"}
                <span className="text-gray-400"> | </span>
                {book.publisherName}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
