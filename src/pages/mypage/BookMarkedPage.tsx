import { useNavigate } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { MyBookLogCard } from "../../components/mypage/MyBookLogCard";
import { useGetMyBookMarkedBooklog } from "../../hooks/queries/useGetMyBookmarkedBooklog";
import { useEffect, useRef } from "react";
import { MyBookLogCardSkeleton } from "../../components/mypage/MyBookLogCardSkeleton";

export const BookMarkedPage = () => {

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMyBookMarkedBooklog();
    const navigate = useNavigate();
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const booklogs = data?.pages.flatMap(page => page.data?.items ?? []).filter(Boolean) ?? [];
    
    useEffect(() => {
        if (!bottomRef.current || !hasNextPage) return;
    
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 0.3 });
    
        observer.observe(bottomRef.current);
    
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <div className="min-h-screen w-full bg-bg flex flex-col">
            <NavBarTop
                title="북마크"
                onBack={() => navigate("/mypage")}
            />

            {isLoading && (
                <div className="flex px-5 flex-col items-start gap-3 self-stretch mt-5">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <MyBookLogCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {!isLoading && booklogs.length === 0 && (
                <div className="flex flex-1 flex-col items-center gap-[10px] justify-center">
                    <p className="text-center text-gray-900 text-title-02">아직 저장한 북로그가 없어요.</p>
                    <p className="text-center text-gray-600 text-body-03">마음에 드는 글을 저장하면,<br/>이곳에서 다시 볼 수 있어요.</p>
                </div>
            )}

            {!isLoading && booklogs.length > 0 && (
                <>
                    <div className="flex px-5 flex-col items-start gap-3 self-stretch mt-5">

                        {booklogs.map((booklog) => (
                            <MyBookLogCard key={booklog.postId} booklog={booklog}/>
                        ))}
                
                        {isFetchingNextPage && 
                            Array.from({ length: 2 }).map((_, i) => (
                                <MyBookLogCardSkeleton key={`fetch-${i}`} />
                        ))}
                    </div>

                    <div ref={bottomRef} className="h-1" />
                </>
            )}
        </div>
    )
}