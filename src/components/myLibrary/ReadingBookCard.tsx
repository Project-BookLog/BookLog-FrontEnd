import type { Book } from "../../types/book.types";

type BookCardProps = {
    book: Book;
}

export const ReadingBookCard = ({book}: BookCardProps) => {
    return (
        <div className="flex w-[104px] flex-col items-start gap-2 shrink-0">
            {book.coverUrl ? (
                <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-[104px] h-[159.059px] aspect-[104.00/159.06] rounded-[4px] bg-gray-300"
                    draggable={false}
                />
            ) : book.CoverIcon ? (
                <book.CoverIcon className="w-[104px] h-[159.059px] aspect-[104.00/159.06] rounded-[4px]" />
            ) : (
                <span className="w-[104px] h-[159.059px] aspect-[104.00/159.06] rounded-[4px] bg-gray-300 text-xs">No Image</span>
            )}
            <div className="flex w-[104px] flex-col items-start gap-[2px]">
                <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">{book.title}</p>
                <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">{book.author}, {book.publisher}</p>
            </div>
            <div className="flex w-[104px] items-start gap-2">
                <div className="flex w-[73px] items-center gap-[2px] shrink-0">
                    <div
                        className="h-[12px] shrink-0 rounded-[4px] bg-primary"
                        style={{width: `${ (71 * book.progress) / 100}px`}}
                    />
                    <div
                        className="h-[12px] shrink-0 rounded-[4px] bg-[rgba(0,0,0,0.08)]"
                        style={{width: `${(71 - ((71 * book.progress) / 100))}px`}}
                    />
                    <p className="text-black text-right text-en-caption-02">{book.progress}%</p>
                </div>
            </div>
        </div>
    )
}