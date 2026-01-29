import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { LibraryTab } from "../../types/library";
import { ArrowDown, BackIcon, Kebab } from "../../assets/icons";
import { useState } from "react";
import { BookCard } from "../../components/myLibrary/BookCard";
import { ReadingBookCard } from "../../components/myLibrary/ReadingBookCard";
import { BOOK_ORDER, sortOptions } from "../../enum/book";
import { SortDropDown } from "../../components/common/dropdown/SortDropDown";
import { LibraryActionDropDown, type LibraryAction } from "../../components/common/dropdown/LibraryActionDropDown";
import { LIBRARY_TABS } from "../../constants/libraryTabs";
import { useGetBookList } from "../../hooks/queries/useGetBookList";

export function MyLibraryDetail() {

  const { shelfId } = useParams();
  const parsedShelfId = shelfId === "-1" ? undefined : Number(shelfId);
  const shelfName = useLocation().state.shelfName;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<LibraryTab>("ALL")
  const [sortOrder, setSortOrder] = useState<BOOK_ORDER>(BOOK_ORDER.LATEST);
  const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);
  const [isActionDropDownOpen, setIsActionDropDownOpen] = useState(false);

  const status = activeTab === "ALL" ? undefined : (activeTab as "TO_READ" | "READING" | "COMPLETED");

  const { data: books, isLoading } = useGetBookList( parsedShelfId, status, sortOrder);
  const bookItems = books?.items ?? [];

  const actions: LibraryAction[] = [
    {
      label: "서재 편집",
      onClick: () => navigate("edit-library"),
      visible: parsedShelfId !== undefined,
    },
    {
      label: "도서 목록 편집",
      onClick: () => {
        if (parsedShelfId === undefined) navigate(`edit-books`);
        else navigate(`edit-books?tab=${activeTab}`);
        }
    },
    {
      label: "중단한 책 보기",
      onClick: () => navigate("/my-library/stopped"),
    },
  ];

  const currentSortLabel = sortOptions.find(
    (option) => option.value === sortOrder
  )?.label


  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-bg">
      {isActionDropDownOpen && ( <div className="absolute inset-0 z-40 bg-b-op15 backdrop-blur-[2px]" /> )}
      {isSortDropDownOpen && ( <div className="absolute inset-0 z-40 bg-b-op15 backdrop-blur-[2px]" /> )}
        <div className="relative flex h-[62px] px-5 pt-5 pb-2 justify-between items-center self-stretch">
            <BackIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate("/my-library")}
            />
            <p className="text-black text-title-01">{shelfName}</p>
            <Kebab
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsActionDropDownOpen(!isActionDropDownOpen)}
            />
            
            {isActionDropDownOpen && (
              <LibraryActionDropDown
                actions={actions}
                onClose={() => setIsActionDropDownOpen(false)}
              />
            )}
        </div>
        <div className="flex px-5 pt-3 items-end gap-3 self-stretch border-b border-gray-200">
          {LIBRARY_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as LibraryTab)}
              className={`flex px-[6px] pb-4 justify-center items-center gap-[10px] border-b-[3px] cursor-pointer ${activeTab === tab.key ? "text-primary text-subtitle-01-sb border-primary" : "text-gray-500 text-subtitle-01-m border-transparent"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-1 w-[375px] flex-col items-center gap-4 mt-5">
          <div className="relative flex px-5 justify-between items-center self-stretch">
            <p className="text-gray-600 text-body-03">총 {bookItems.length ?? 0}권</p>
            <button
              className="flex items-center gap-[2px] cursor-pointer"
              onClick={() => setIsSortDropDownOpen(!isSortDropDownOpen)}
            >
              <p className="text-gray-600 text-body-03">{currentSortLabel}</p>
              <ArrowDown className="w-[14px] h-[14px]"/>
            </button>
            {isSortDropDownOpen && (
              <SortDropDown
                currentSort={sortOrder}
                onSelectSort={(order) => {
                  setSortOrder(order);
                  setIsSortDropDownOpen(false);
                }}
                onClose={() => setIsSortDropDownOpen(false)}
              />
            )}
          </div>
          {bookItems.length === 0 ? (
            parsedShelfId === undefined ? (
              <div className="flex flex-1 flex-col items-center gap-[10px] justify-center">
                <p className="text-center text-gray-900 text-title-02">저장된 책이 없습니다.</p>
                <p className="text-center text-gray-600 text-body-03">먼저 읽고 있거나 읽고 싶은 책을 담아보세요.</p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center gap-[10px] justify-center">
                <p className="text-center text-gray-900 text-title-02">서재에 담긴 책이 없습니다.</p>
                <p className="text-center text-gray-600 text-body-03">먼저 읽고 있거나 읽고 싶은 책을 서재에 담아보세요.</p>
              </div>
            )
          ) : (
            activeTab !== "READING" ? (
              <div className="flex w-[335px] items-end content-end gap-x-[11.5px] gap-y-6 flex-wrap">
                {bookItems.map((book) => (
                  <BookCard key={book.bookId} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex w-[335px] items-end content-end gap-x-[11.5px] gap-y-[32px] flex-wrap">
                {bookItems.map((book) => (
                  <ReadingBookCard key={book.bookId} book={book} />
                ))}
              </div>
            )
          )}
        </div>
    </div>
  );
}
