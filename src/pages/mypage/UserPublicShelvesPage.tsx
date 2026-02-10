import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { useGetPublicUserShelves } from "../../hooks/queries/useGetPublicUserShelves";

export default function UserPublicShelvesPage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const parsedUserId = useMemo(() => {
    const n = Number(userId);
    return Number.isFinite(n) ? n : undefined;
  }, [userId]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetPublicUserShelves(parsedUserId);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const shelves =
    data?.pages.flatMap((page) => page.data?.items ?? []).filter(Boolean) ?? [];

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, shelves.length]);

  const GradationFrame =
    "w-[347px] shrink-0 self-stretch rounded-b-[6px] border-[1.2px] border-[rgba(255,255,255,0.7)] bg-[linear-gradient(153deg,rgba(48,73,192,0.28)_18%,rgba(120,138,222,0.28)_44.99%,rgba(120,138,222,0.31)_58.48%,rgba(48,73,192,0.35)_85.47%)] shadow-[0_6px_16px_rgba(48,73,192,0.15)] backdrop-blur-[2px]";

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop title="공개 서재" onBack={() => navigate(-1)} />

      {isLoading && (
        <div className="px-5 py-12 text-center text-body-03 text-gray-600">
          서재를 불러오는 중이에요.
        </div>
      )}

      {!isLoading && shelves.length === 0 && (
        <div className="px-5 py-20 text-center">
          <p className="text-title-02 text-[#262626]">공개된 서재가 없어요.</p>
          <p className="mt-3 text-body-03 text-[#81807F]">
            유저가 서재를 공개하면 이곳에서 확인할 수 있어요.
          </p>
        </div>
      )}

      {!isLoading && shelves.length > 0 && (
        <div className="flex flex-col gap-7 py-6">
          {shelves.map((shelf) => {
            const books = (shelf.previewBooks ?? shelf.topBooks ?? []).slice(0, 3);

            return (
              <section
                key={shelf.shelfId}
                className="flex flex-col items-center gap-8 self-stretch"
              >
                <div className="flex px-5 justify-between items-center self-stretch">
                  <p className="text-black text-title-02">{shelf.name}</p>
                </div>

                {books.length === 0 ? (
                  <div className="text-center text-body-03 text-gray-600">
                    서재에 담긴 책이 없습니다.
                  </div>
                ) : (
                  <div className="relative flex w-[375px] px-5 flex-col items-center gap-[10px]">
                    <div className="inline-flex items-center gap-[10px]">
                      {books.map((book) => (
                        <div
                          key={book.bookId}
                          className="flex w-[104px] h-[156px] items-center rounded-[4px] overflow-hidden bg-[#CDCCCB]"
                        >
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

                    <div className="absolute top-[116px] flex w-[347px] h-[52px] justify-center items-center">
                      <span className={GradationFrame} />
                    </div>

                    <div className="flex items-center gap-[10px]">
                      {books.map((book) => (
                        <div
                          key={`${shelf.shelfId}-${book.bookId}`}
                          className="flex w-[104px] flex-col justify-center items-start gap-[2px]"
                        >
                          <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-black text-subtitle-02-sb">
                            {book.title}
                          </p>
                          <p className="w-[105px] line-clamp-1 overflow-hidden text-ellipsis text-gray-500 text-caption-02">
                            {book.authorName}, {book.publisherName}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}

          {isFetchingNextPage && (
            <div className="px-5 py-4 text-center text-body-03 text-gray-600">
              더 불러오는 중...
            </div>
          )}

          <div ref={bottomRef} className="h-1" />
        </div>
      )}
    </div>
  );
}
