import { useState } from "react"
import { Bookmark } from "../../assets/icons"
import type { BookLog } from "../../types/booklog.types"

type MyBookCardProps = {
    booklog: BookLog,
    isBookMarked?: boolean
}

export const  MyBookLogCard = ({ booklog, isBookMarked }: MyBookCardProps) => {
    const [isBookmarked, setIsBookmarked] = useState(isBookMarked ?? false);

    const handleBookmarkClick = () => {
        setIsBookmarked(prev => !prev)

        // bookmark API 요청
    }

     return (
        <div className="flex px-5 pt-4 pb-[14px] flex-col items-start gap-3 self-stretch rounded-[12px] border-b border-gray-100 bg-gray-100">
            <div className="flex justify-between items-start self-stretch">
                <img
                    className="flex w-[94px] h-[94px] justify-center items-center rounded-[8px] bg-gray-300"
                    alt=""
                />
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
                <p className="self-stretch overflow-hidden text-ellipsis line-clamp-2 text-gray-800 text-caption-01">
                    {booklog.content}
                </p>
                <div className="flex justify-between items-center self-stretch">
                    <div className="flex items-center gap-1">
                        {booklog.tags.map((tag) => (
                            <p
                                key={tag}
                                className="flex px-2 py-[3px] justify-center items-center gap-[10px] rounded-[4px] bg-lightblue-3 text-center text-primary text-caption-02"
                            >
                                {tag}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center gap-[2px]">
                        <Bookmark
                            className={`w-6 h-6 ${isBookmarked ? "text-primary fill-current" : "text-gray-500"}`}
                            onClick={handleBookmarkClick}
                        />
                        <p className="text-gray-500 [font-feature-settings:'liga'_off] text-en-caption-01">20</p>
                    </div>
                </div>
            </div>
        </div>
     )
}