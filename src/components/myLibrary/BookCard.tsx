import type { UserBook } from "../../types/library";

type BookCardProps = {
  book: UserBook;
  onClick?: (book: UserBook) => void;
};

export const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <div
      className="flex w-[104px] flex-col items-start gap-2 shrink-0"
      onClick={() => onClick?.(book)}
    >
      {book.thumbnailUrl ? (
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px] bg-gray-300 cursor-pointer"
          draggable={false}
        />
      ) : (
        <button
          type="button"
          className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px] bg-gray-300 text-xs cursor-pointer"
        >
          No Image
        </button>
      )}

      <div className="flex w-[104px] flex-col justify-center items-start gap-[2px]">
        <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">
          {book.title}
        </p>
        <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">
          {book.authorName}, {book.publisherName}
        </p>
      </div>
    </div>
  );
};
