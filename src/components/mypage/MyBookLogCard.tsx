import { useNavigate } from "react-router-dom";
import { Bookmark } from "../../assets/icons"
import { useToggleBooklogBookmark } from "../../hooks/mutations/useToggleBooklogBookmark";
import type { MyBooklogItem } from "../../types/myPage/myBooklog"

type MyBookCardProps = {
    booklog: MyBooklogItem,
    onClick?: () => void,
}

export const MyBookLogCard = ({ booklog, onClick }: MyBookCardProps) => {
    
    const { mutate: toggleBookmark } = useToggleBooklogBookmark();
    const images = booklog.images;
    const visibleImages = images.slice(0, 3);
    const remainCount = images.length - 2;

    return (
        <div
            className="flex px-5 pt-4 pb-[14px] flex-col items-start gap-3 self-stretch rounded-[12px] border-b border-gray-100 bg-gray-100"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (!onClick) return;
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="flex justify-between items-start self-stretch">
                {visibleImages.map((img, index) => {
                    if (index === 2 && images.length > 3) {
                        return (
                            <div key={index} className="flex w-[94px] h-[94px] px-[82.276px] py-[43.606px] justify-center items-center gap-[5px] rounded-[6.582px] bg-gray-300">
                                <p className="[font-feature-settings:'liga'_off] text-black text-en-caption-01">+{remainCount}</p>
                            </div>
                        );
                    }
                    return (
                        <img
                            className="flex w-[94px] h-[94px] justify-center items-center rounded-[8px] bg-gray-300"
                            key={index}
                            src={img.imageUrl}
                        /> 
                    );
                })}
            </div>
            <div className="flex flex-col items-start gap-2 self-stretch">
                <p className="self-stretch overflow-hidden text-ellipsis line-clamp-2 text-gray-800 text-caption-01">
                    {booklog.excerpt}
                </p>
                <div className="flex justify-between items-center self-stretch">
                    <div className="flex items-center gap-1">
                        {booklog.tags.map((tag) => (
                            <p
                                key={tag.tagId}
                                className="flex px-2 py-[3px] justify-center items-center gap-[10px] rounded-[4px] bg-lightblue-3 text-center text-primary text-caption-02"
                            >
                                {tag.name}
                            </p>
                        ))}
                    </div>
                    <div className="flex items-center gap-[2px]">
                        <Bookmark
                            className={`w-6 h-6 ${booklog.bookmarkedByMe ? "text-primary fill-current" : "text-gray-500"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark({ postId: booklog.postId });
                            }}
                        />
                        <p className="text-gray-500 [font-feature-settings:'liga'_off] text-en-caption-01">{booklog.bookmarkCount}</p>
                    </div>
                </div>
            </div>
        </div>
     )
}
