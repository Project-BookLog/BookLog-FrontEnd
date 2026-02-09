import { useEffect, useRef, useState } from "react";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import Tab from "../../components/common/Tab";
import BookRecommeded from "../../components/home/book/BookRecommended";
import BookInfo from "../../components/home/book/BookInfo";
import BookLogCarousel from "../../components/home/book/BookLogCarousel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetBookDetail } from "../../hooks/queries/useGetBookDetail";
import { LoadingPage } from "../onboarding/LoadingPage";
import { usePostUserBook } from "../../hooks/mutations/usePostUserBook";
import { useGetUserBookDetail } from "../../hooks/queries/useGetUserBookDetail";
import type { BookFormat, BookStatus } from "../../types";
import { useGetUserBookList } from "../../hooks/queries/useGetUserBookList";

const TABS = ["책 추천", "책 정보", "북로그"] as const;
type TabType = (typeof TABS)[number];

const USER_BOOK_STATUS_LABEL: Record<BookStatus, string> = {
  TO_READ: "읽을 예정",
  READING: "읽는 중",
  COMPLETED: "완독",
  STOPPED: "중단",
};

const BOOK_FORMAT_LABEL: Record<BookFormat, string> = {
  PAPER: "종이책",
  EBOOK: "전자책",
  AUDIO: "오디오북"
}

export const BookDetailPage = () => {
  const [tab, setTab] = useState<TabType>("책 추천");

  const RecommendedRef = useRef<HTMLElement | null>(null);
  const InfoRef = useRef<HTMLElement | null>(null);
  const BookLogRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const shelfName = location.state?.shelfName;
  const shelfId = location.state?.shelfId;
 
  const { bookId, userBookId } = useParams<{ bookId?: string; userBookId?: string }>();
  const isUserBook = !!userBookId;
  const { data: userBook, isLoading: isUserBookLoading } = useGetUserBookDetail(Number(userBookId));
  const resolvedBookId = bookId ? Number(bookId) : userBook?.bookId;
  const { data: book, isLoading: isBookLoading } = useGetBookDetail(resolvedBookId as number);
  const { mutate: saveBook, isPending: isSaveBookPending } = usePostUserBook();
  const bookIdNumber = bookId ? Number(bookId) : undefined;
  const { data: userBooks, isLoading: isUserBooksLoading } = useGetUserBookList();
  const navigate = useNavigate();

  const matchedUserBook = userBooks?.items.find(
    (item) => item.bookId === bookIdNumber
  );

  useEffect(() => {
    if (!bookIdNumber) return;
    if (isUserBooksLoading) return;

    if (matchedUserBook) {
      navigate(`/my-library/book-detail/${matchedUserBook.userBookId}`,{ replace: true });
    }
  }, [bookIdNumber, matchedUserBook, isUserBooksLoading, navigate]);


  useEffect(() => {
    const handleScroll = () => {
      const sections: { name: TabType; el: HTMLElement | null }[] = [
        { name: "책 추천", el: RecommendedRef.current },
        { name: "책 정보", el: InfoRef.current },
        { name: "북로그", el: BookLogRef.current },
      ];

      const viewportMiddle = window.scrollY + window.innerHeight / 2 - 40;

      let closestName: TabType = tab;
      let closestDistance = Infinity;

      sections.forEach(({ name, el }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sectionMiddle = rect.top + window.scrollY + rect.height / 2;
        const distance = Math.abs(sectionMiddle - viewportMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestName = name;
        }
      });

      if (closestName !== tab) {
        setTab(closestName);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tab]);

  if (isBookLoading) return <LoadingPage />;
  if (isUserBook && isUserBookLoading) return <LoadingPage />;
  if (!isUserBook && isUserBooksLoading) return <LoadingPage />;
  if (!book) return null;

  console.log("BookDetailPage render", { isLoading, bookId });


  const authors = book.authors
  .filter((a) => a.role === "AUTHOR")
  .map((a) => a.name)
  .join(", ");

  const translators = book.authors
  .filter((a) => a.role === "TRANSLATOR")
  .map((a) => a.name)
  .join(", ");


  const handleChangeTab = (nextTab: TabType) => {
    setTab(nextTab);

    const getTarget = () => {
      if (nextTab === "책 추천") return RecommendedRef.current;
      if (nextTab === "책 정보") return InfoRef.current;
      if (nextTab === "북로그") return BookLogRef.current;
      return null;
    };

    const el = getTarget();
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetTop = window.scrollY + rect.top;
    const OFFSET = 80;

    window.scrollTo({
      top: offsetTop - OFFSET,
      behavior: "smooth",
    });
  };

  const handleSaveBook = () => {
    if (!bookId) return;
    saveBook({bookId: book.bookId});
  }

  const handleGoToRecordPage = () => {
    if (!userBookId) return;
    navigate(`/my-library/record/${userBookId}`, { state: {shelfName, shelfId}});
  }

  return (
    <div className="min-h-screen bg-bg">
      <NavBarTop
        back={true}
        onBack={() => history.back()}
        title="책 정보"
      />

      <main className="pb-6 pt-4 space-y-5 mb-10">
        {/* 상단 책 썸네일 + 정보 */}
        <div className="px-6">
          <div className="flex justify-center">
            <div className=" rounded-[4px] w-[150px] h-[230px]">
              {book.thumbnailUrl ? (
                <img
                  src={book.thumbnailUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <button className="px-2 py-1 h-6 rounded-sm bg-lightblue-1 text-caption-02 text-primary">
                {!isUserBook ? "도서" : userBook?.status ? USER_BOOK_STATUS_LABEL[userBook.status] : "-"}
              </button>
            </div>
            <div>
              <p className="text-title-01">{book.title}</p>
              <p className="text-caption-01 text-gray-500 mb-2 mt-1">
                상실, 사랑 그리고 숨어 있는 삶의 질서에 관한 이야기
              </p>
              <p className="text-caption-02 text-gray-500">
                {authors ? `${authors} 저` : "-"}
                <span className="text-gray-200"> | </span>
                {translators ? `${translators} 역` : "-"}
              </p>
            </div>
          </div>
        </div>

        {isUserBook && (
          <div className="flex w-[350px] h-[66px] mx-auto justify-center items-center gap-[18px] mt-5 rounded-[4px] bg-gray-100">
            <div className="flex w-[51px] flex-col items-center gap-[6px] shrink-0">
              <p className="self-stretch text-center text-gray-500 text-caption-02">시작 날짜</p>
              <p className="self-stretch text-center text-gray-800 text-caption-01">{userBook?.startDate ?? "-"}</p>
            </div>
            <span className="w-[1px] h-8 shrink-0 bg-gray-200"/>
            <div className="flex w-[51px] flex-col items-center gap-[6px] shrink-0">
              <p className="self-stretch text-center text-gray-500 text-caption-02">종료 날짜</p>
              <p className="self-stretch text-center text-gray-800 text-caption-01">{userBook?.endDate ?? "-"}</p>
            </div>
            <span className="w-[1px] h-8 shrink-0 bg-gray-200"/>
            <div className="flex w-[51px] flex-col items-center gap-[6px] shrink-0">
              <p className="self-stretch text-center text-gray-500 text-caption-02">종류</p>
              <p className="self-stretch text-center text-gray-800 text-caption-01">{userBook?.format ? BOOK_FORMAT_LABEL[userBook.format] : "-"}</p>
            </div>
            <span className="w-[1px] h-8 shrink-0 bg-gray-200"/>
            <div className="flex w-[51px] flex-col items-center gap-[6px] shrink-0">
              <p className="self-stretch text-center text-gray-500 text-caption-02">페이지 수</p>
              <p className="self-stretch text-center text-gray-800 text-caption-01">{userBook?.pageCountSnapshot != null ? `${userBook?.pageCountSnapshot}쪽`: "-"}</p>
            </div>
          </div>
        )}

        {/* 탭 */}
        <div className="sticky top-0 z-10 bg-bg">
          <div className="px-6 border-b border-gray-200 bg-white">
            <Tab
              tabs={TABS}
              active={tab}
              onChange={handleChangeTab}
              align="start"
            />
          </div>
        </div>

        {/* 책 추천 섹션 */}
        <section ref={RecommendedRef}>
          <BookRecommeded />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 책 정보 섹션 */}
        <section ref={InfoRef}>
          <BookInfo book={book} />
          <hr className="mt-5 h-2 bg-gray-100 border-none" />
        </section>

        {/* 북로그 섹션 */}
        <section ref={BookLogRef}>
          <BookLogCarousel />
        </section>
      </main>

      <div className="px-6 mb-4">
        {!isUserBook ? (
          <button
            className="w-full h-13 rounded-lg bg-black text-white text-subtitle-02-sb"
            onClick={handleSaveBook}
            disabled={isSaveBookPending}
          >
            서재에 저장
          </button>
        ) : (
          <button
            className="w-full h-13 rounded-lg bg-primary text-white text-subtitle-02-sb"
            onClick={handleGoToRecordPage}
          >
            독서 기록
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;