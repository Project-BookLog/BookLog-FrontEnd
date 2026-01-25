import { useNavigate } from "react-router-dom"
import { BackIcon } from "../../assets/icons"
import { GradationFrame } from "../../components/myLibrary/GradationFrame"
import NavbarBottom from "../../components/common/navbar/NavBarBottom"
import { useGetShelves } from "../../hooks/queries/useGetShelves"

export function MyLibraryPage () {

    const { data: shelves = [] } = useGetShelves(1);
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-bg pb-32">
            <div className="flex h-[62px] px-5 pt-5 pb-2 items-center self-stretch">
                <p className="text-black text-head">내 서재</p>
            </div>
            <div className="flex flex-col w-[375px] items-start gap-7 mt-8">
                {shelves.map((shelf) => (
                    <div key={shelf.shelfId} className="flex flex-col items-center gap-8 self-stretch">
                        <div className="flex px-5 justify-between items-center self-stretch">
                            <p className="text-black text-title-02">{shelf.name}</p>
                            <button
                                className="flex items-center gap-[2px]"
                                onClick={() => navigate(`/my-library/${shelf.name}`)}
                            >
                                <p className="text-body-03 text-gray-500 cursor-pointer">전체보기</p>
                                <BackIcon className="w-[14px] h-[14px] rotate-180"/>
                            </button>
                        </div>
                        {shelf.previewBooks.length === 0 ? ( shelf.shelfId === -1 ? (
                            <div className="flex flex-col items-center gap-[10px]">
                                <p className="text-center text-gray-900 text-subtitle-01-sb">저장된 책이 없습니다.</p>
                                <p className="text-center text-gray-600 text-body-03">먼저 읽고 있거나 읽고 싶은 책을 담아보세요.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-[10px]">
                                <p className="text-center text-gray-900 text-subtitle-01-sb">서재에 담긴 책이 없습니다.</p>
                                <p className="text-center text-gray-600 text-body-03">먼저 읽고 있거나 읽고 싶은 책을 서재를 담아보세요.</p>
                            </div>
                        )) : (
                            <div className="relative flex w-[375px] px-5 flex-col items-center gap-[10px]">
                                <div className="h-[168px] self-stretch">
                                <div className="inline-flex items-center gap-[10px]">
                                    {shelf.previewBooks.slice(0, 3).map((book) => (
                                        <div key={book.bookId} className="flex w-[104px] h-[156px] items-center rounded-[4px]">
                                            {book.thumbnailUrl ? (
                                                <img
                                                    src={book.thumbnailUrl}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover"
                                                    draggable={false}
                                                />
                                            ) : (
                                                <span className="text-xs">No Image</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                </div>
                                <div className="absolute top-[116px] flex w-[347px] h-[52px] justify-center items-center">
                                    <GradationFrame/>
                                </div>
                                <div className="flex items-center gap-[10px] self-stretch">
                                    {shelf.previewBooks.slice(0, 3).map((book) => (
                                        <div className="flex w-[104px] flex-col justify-center items-start gap-[2px]">
                                            <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">{book.title}</p>
                                            <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">{book.authorName}, {book.publisherName}</p>
                                        </div>  
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <NavbarBottom/>
        </div>
    )
}