import type { Book } from "../../types/book.types"

type BookCardProps = {
    book: Book;
}

export const BookCard = ({book}: BookCardProps) => {
    return (
        <div className="flex w-[104px] flex-col items-start gap-2 shrink-0">
            {book.coverUrl ? (
                <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px] bg-gray-300"
                    draggable={false}
                />
            ) : book.CoverIcon ? (
                <book.CoverIcon className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px]" />
            ) : (
                <span className="w-[104px] h-[158.476px] aspect-[104.00/158.48] rounded-[4px] bg-gray-300 text-xs">No Image</span>
            )}
            <div className="flex w-[104px] flex-col justify-center items-start gap-[2px]">
                <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">{book.title}</p>
                <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">{book.author}, {book.publisher}</p>
            </div>
        </div>
    )
}