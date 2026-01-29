import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Book } from "../../../types/book.types";
import { BackIcon, Reset } from "../../../assets/icons";
import { SortDropDown } from "../../common/dropdown/SortDropDown";
import { BOOK_ORDER, sortOptions } from "../../../enum/book";
import { FilterChips, type FilterChip } from "../../common/FilterChips";

type FilterKey = "mood" | "style" | "immersion";

type BookResultsProps = {
  keyword: string;
  total: number;
  items: Book[];
  selectedFilters?: Partial<Record<FilterKey, string>>;
  onResetFilters?: () => void;
  onFilterClick?: (key: FilterKey) => void;
};

export default function BookResults({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  keyword,
  total,
  items,
  selectedFilters = {},
  onResetFilters,
  onFilterClick,
}: BookResultsProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentSort, setCurrentSort] = useState<BOOK_ORDER>(BOOK_ORDER.LATEST);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const sortParam = searchParams.get("sort") as BOOK_ORDER;
    if (sortParam && Object.values(BOOK_ORDER).includes(sortParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentSort(sortParam);
    }
  }, [searchParams]);

  // sort 변경 시 URL 업데이트
  const handleSortChange = (sort: BOOK_ORDER) => {
    setCurrentSort(sort);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", sort);
      return newParams;
    });
    setIsSortOpen(false);
  };

  const currentSortLabel =
    sortOptions.find((o) => o.value === currentSort)?.label ?? "정렬";

  const sortedItems = useMemo(() => {
    const copied = [...items];
    switch (currentSort) {
      case BOOK_ORDER.LATEST:
        return copied.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case BOOK_ORDER.OLDEST:
        return copied.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case BOOK_ORDER.TITLE:
        return copied.sort((a, b) =>
          a.title.localeCompare(b.title, "ko", { sensitivity: "base" })
        );
      case BOOK_ORDER.AUTHOR:
        return copied.sort((a, b) =>
          a.author.localeCompare(b.author, "ko", { sensitivity: "base" })
        );
      default:
        return copied;
    }
  }, [items, currentSort]);

  const handleBookClick = (bookId: string | number) => {
    navigate(`/book/${bookId}`);
  };

const goFilter = (from: FilterKey) => {
  const url = new URL(window.location.href);
  url.pathname = '/search/filter';
  url.searchParams.set("from", from);
  navigate(url.toString());
};

const filterKeys: FilterKey[] = ["mood", "style", "immersion"];
const filterLabels: Record<FilterKey, string> = {
  mood: "분위기",
  style: "문체", 
  immersion: "몰입도"
};

const filterChips: FilterChip[] = filterKeys.map((key) => ({
  key,
  label: selectedFilters[key] || filterLabels[key],
  isActive: !!selectedFilters[key],
  onClick: () => onFilterClick ? onFilterClick(key) : goFilter(key),
}));


  const hasAnyFilter = Object.values(selectedFilters).some(Boolean);

  const handleResetFilters = () => {
    onResetFilters?.();
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      Object.keys(selectedFilters).forEach((key) => {  
        newParams.delete(key);  
      });  
      return newParams;
    });
  };

  return (
    <section className="relative bg-bg">
      {isSortOpen && (
        <button
          type="button"
          onClick={() => setIsSortOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        />
      )}

      {/* 필터 칩스 */}
      <div className="mb-5 flex items-center gap-3 pl-5">
        <button
          type="button"
          onClick={handleResetFilters}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 disabled:opacity-50"
          disabled={!hasAnyFilter}
        >
          <Reset className="h-4 w-4" />
        </button>

        <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar pr-1">
          <FilterChips chips={filterChips} />
        </div>
      </div>

      {/* 정렬 */}
      <div className="mb-3 flex items-center justify-between px-5">
        <p className="text-body-03 text-gray-600">
          총 <span className="text-primary">{total}</span>권
        </p>

        <div className="relative z-50 inline-flex">
          <button
            type="button"
            className="flex items-center gap-1 text-body-03 text-gray-600"
            onClick={() => setIsSortOpen((prev) => !prev)}
          >
            <span>{currentSortLabel}</span>
            <BackIcon className="h-4 w-4 rotate-270" />
          </button>

          {isSortOpen && (
            <div className="pointer-events-none">
              <div className="pointer-events-auto mt-3 translate-x-5">
                <SortDropDown
                  currentSort={currentSort}
                  onSelectSort={handleSortChange}
                  onClose={() => setIsSortOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 도서 리스트 */}
      <div className="mb-10 space-y-3 px-5">
        {sortedItems.map((book) => {
          const { CoverIcon } = book;
          return (
            <button
              key={book.id}
              type="button"
              className="flex w-full items-center gap-5"
              onClick={() => handleBookClick(book.id)}
            >
              <div className="flex h-26 w-17 items-center justify-center overflow-hidden rounded">
                <CoverIcon className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-subtitle-02-sb truncate">{book.title}</p>
                <p className="text-caption-02 truncate text-gray-600">
                  {book.author}
                  <span className="text-gray-400"> | </span>
                  {book.publisher}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
