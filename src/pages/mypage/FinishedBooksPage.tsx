import { useNavigate } from "react-router-dom";
import NavBarTop from "../../components/common/navbar/NavBarTop";
import { useAuth } from "../../context/AuthContext"
import type { Library } from "../../types/library";
import { useMemo, useState } from "react";
import { BOOK_ORDER, sortOptions } from "../../enum/book";
import { ArrowDown } from "../../assets/icons";
import { SortDropDown } from "../../components/common/dropdown/SortDropDown";
import { BookCard } from "../../components/myLibrary/BookCard";
import { sortBooks } from "../../utils/sortBooks";

export const FinishedBooksPage = ({ libraries }: { libraries: Library[] }) => {
    const { id } = useAuth();
    const navigate = useNavigate();
    const library = libraries.find((lib) => lib.name === "전체 도서");
    const [sortOrder, setSortOrder] = useState<BOOK_ORDER>(library?.sort ?? BOOK_ORDER.LATEST);
    const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);

    if (!id) return null;

    const finishedBooks = useMemo(() => {
        if(!library) return [];

        return library.books.filter((book) => book.bookId === 100);
    }, [library]);

    const sortedBooks = useMemo(() => {
        if (!finishedBooks) return [];
        return sortBooks(finishedBooks,sortOrder)
    }, [finishedBooks, sortOrder]);
    
      const currentSortLabel = sortOptions.find(
        (option) => option.value === sortOrder
      )?.label

    return (
        <div className="min-h-screen w-full bg-bg relative flex flex-col">
            <NavBarTop
                title="독서 완독"
                onBack={() => navigate("/mypage")}
            />
            {isSortDropDownOpen && ( <div className="absolute inset-0 z-40 bg-b-op15 backdrop-blur-[2px]" /> )}
            {finishedBooks.length === 0 ? (
                <div className="flex flex-1 flex-col items-center gap-[10px] justify-center">
                    <p className="text-center text-gray-900 text-title-02">아직 다 읽은 책이 없어요.</p>
                    <p className="text-center text-gray-600 text-body-03">마지막 페이지를 덮으면, 이곳에 기록이 남아요.</p>
              </div>
            ) : (
                <div className="flex flex-col items-center gap-4 self-stretch mt-5">
                    <div className="flex px-5 justify-between items-center self-stretch relative">
                        <p className="text-gray-600 text-body-03">총 {finishedBooks.length}권</p>
                        <button
                            className="flex items-center gap-[2px]"
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
                    <div className="flex w-[335px] items-end content-end gap-x-[11.5px] gap-y-6 flex-wrap">
                        {sortedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}