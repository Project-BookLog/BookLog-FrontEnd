import { useNavigate, useParams } from "react-router-dom";
import type { Library, LibraryTab } from "../../types/library";
import { ArrowDown, BackIcon, Kebab } from "../../assets/icons";
import { useMemo, useState } from "react";
import { BookCard } from "../../components/myLibrary/BookCard";
import { ReadingBookCard } from "../../components/myLibrary/ReadingBookCard";
import { BOOK_ORDER, sortOptions } from "../../enum/book";
import { SortDropDown } from "../../components/common/dropdown/SortDropDown";
import { LibraryActionDropDown, type LibraryAction } from "../../components/common/dropdown/LibraryActionDropDown";
import { sortBooks } from "../../utils/sortBooks";
import { LIBRARY_TABS } from "../../constants/libraryTabs";
import { TAB_TO_STATUSES } from "../../domain/Library";
import { getBookStatusByProgress } from "../../domain/BookStatus";

export function MyLibraryDetail({ libraries }: { libraries: Library[] }) {

  const { libraryName } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<LibraryTab>("ALL")

  const library = libraries.find(
    (lib) => lib.name === libraryName
  );

  const [sortOrder, setSortOrder] = useState<BOOK_ORDER>(library?.sort ?? BOOK_ORDER.LATEST);
  const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);
  const [isActionDropDownOpen, setIsActionDropDownOpen] = useState(false);

  const actions: LibraryAction[] = [
    {
      label: "서재 편집",
      onClick: () => navigate("edit-library"),
      visible: library?.name !== "전체 도서",
    },
    {
      label: "도서 목록 편집",
      onClick: () => {
        if (library?.name === "전체 도서") navigate(`edit-books`);
        else navigate(`edit-books?tab=${activeTab}`);
        }
    },
    {
      label: "중단한 책 보기",
      onClick: () => navigate("/my-library/stopped"),
    },
  ];

  const filteredBooks = useMemo(() => {
    if (!library) return [];

    const allowedStatuses = TAB_TO_STATUSES[activeTab];

    return library.books.filter((book) => {
      const status = getBookStatusByProgress(book.progress);
      return allowedStatuses.includes(status);
    });
  }, [activeTab, library]);


  const sortedBooks = useMemo(() => {
    if (!filteredBooks) return [];
    return sortBooks(filteredBooks, sortOrder);
  }, [filteredBooks, sortOrder]);

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
            <p className="text-black text-title-01">{library?.name}</p>
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
            <p className="text-gray-600 text-body-03">총 {filteredBooks?.length ?? 0}권</p>
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
          {filteredBooks?.length === 0 ? (
            library?.name === "전체 도서" ? (
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
                {sortedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex w-[335px] items-end content-end gap-x-[11.5px] gap-y-[32px] flex-wrap">
                {sortedBooks.map((book) => (
                  <ReadingBookCard key={book.id} book={book} />
                ))}
              </div>
            )
          )}
        </div>
    </div>
  );
}
