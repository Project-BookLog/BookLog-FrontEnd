import type { UserBook } from "../../types/library";

type BookCardProps = {
    book: UserBook;
}

export const ReadingBookCard = ({book}: BookCardProps) => {
    return (
        <div className="flex w-[104px] flex-col items-start gap-2 shrink-0">
            {book.thumbnailUrl ? (
                <img
                    src={book.thumbnailUrl}
                    alt={book.title}
                    className="w-[104px] h-[159.059px] aspect-[104.00/159.06] rounded-[4px] bg-gray-300"
                    draggable={false}
                />
            ) : (
                <span className="w-[104px] h-[159.059px] aspect-[104.00/159.06] rounded-[4px] bg-gray-300 text-xs">No Image</span>
            )}
            <div className="flex w-[104px] flex-col items-start gap-[2px]">
                <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">{book.title}</p>
                <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">{book.authorName}, {book.publisherName}</p>
            </div>
            <div className="flex w-[104px] items-start gap-2">
                <div className="flex w-[73px] items-center gap-[2px] shrink-0">
                    <div
                        className="h-[12px] shrink-0 rounded-[4px] bg-primary"
                        style={{width: `${ (71 * book.progressPercent) / 100}px`}}
                    />
                    <div
                        className="h-[12px] shrink-0 rounded-[4px] bg-[rgba(0,0,0,0.08)]"
                        style={{width: `${(71 - ((71 * book.progressPercent) / 100))}px`}}
                    />
                    <p className="text-black text-right text-en-caption-02">{book.progressPercent}%</p>
                </div>
            </div>
        </div>
    )
}