import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/book.types";

type BookCardProps = {
  book: Book;
};

export const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  const goRecord = () => {
    navigate(`/my-library/record/${book.id}`);
  };

  return (
    <div className="flex w-[104px] flex-col items-start gap-2 shrink-0">
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px] bg-gray-300 cursor-pointer"
          draggable={false}
          onClick={goRecord}
        />
      ) : book.CoverIcon ? (
        <button type="button" onClick={goRecord} className="cursor-pointer">
          <book.CoverIcon className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px]" />
        </button>
      ) : (
        <button
          type="button"
          onClick={goRecord}
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
          {book.author}, {book.publisher}
        </p>
      </div>
    </div>
  );
};
