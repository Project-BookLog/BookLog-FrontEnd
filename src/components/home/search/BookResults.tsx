import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../../types/book.types";
import { BackIcon, Reset } from "../../../assets/icons";
import { SortDropDown } from "../../common/dropdown/SortDropDown";
import { BOOK_ORDER, sortOptions } from "../../../enum/book";
import { FilterChips, type FilterChip } from "../../common/FilterChips";

type FilterKey = "mood" | "style" | "immersion";

export type BookResultsProps = {
  keyword: string;
  total: number;
  items: Book[];
  mode?: "compact" | "full";
  onMoreClick?: () => void;
  selectedFilters?: Partial<Record<FilterKey, string>>;
  onResetFilters?: () => void;
  onFilterClick?: (key: FilterKey) => void;
};


function BookResults({
  keyword,
  total,
  items,
  mode = "compact",
  onMoreClick,
  selectedFilters = {},
  onResetFilters,
  onFilterClick,
}: BookResultsProps) {
  const navigate = useNavigate();

  const isCompact = mode === "compact";
  const showMoreButton = isCompact && total > items.length;

  const [currentSort, setCurrentSort] = useState<BOOK_ORDER>(BOOK_ORDER.LATEST);
  const [isSortOpen, setIsSortOpen] = useState(false);

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


  const renderItems = mode === "full" ? sortedItems : items;

  const goFilter = (from: FilterKey) => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    params.set("from", from);
    params.set("tab", "book");
    params.set("returnUrl", "/search");
    navigate(`/search/filter?${params.toString()}`); 
  };


  const filterChips: FilterChip[] = [
    {
      key: "mood",
      label: selectedFilters.mood || "분위기",
      isActive: !!selectedFilters.mood,
      onClick: () => onFilterClick ? onFilterClick("mood") : goFilter("mood"),
    },
    {
      key: "style",
      label: selectedFilters.style || "문체",
      isActive: !!selectedFilters.style,
      onClick: () => onFilterClick ? onFilterClick("style") : goFilter("style"),
    },
    {
      key: "immersion",
      label: selectedFilters.immersion || "몰입도",
      isActive: !!selectedFilters.immersion,
      onClick: () => onFilterClick ? onFilterClick("immersion") : goFilter("immersion"),
    },
  ];

  const hasAnyFilter = Object.values(selectedFilters).some(Boolean);

  return (
    <section className="relative">
      {isSortOpen && (
        <button
          type="button"
          onClick={() => setIsSortOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        />
      )}

      {/* compact 헤더 */}
      {isCompact && (
        <header className="mb-3 flex items-center justify-between px-5">
          <div className="flex items-baseline gap-2">
            <h2 className="text-title-02 text-black">도서</h2>
            <span className="text-caption-01 text-primary">{total}권</span>
          </div>
          {showMoreButton && (
            <button type="button" className="text-xs text-gray-500" onClick={onMoreClick}>
              <BackIcon className="h-5 w-5 rotate-180" />
            </button>
          )}
        </header>
      )}

      {/* full 모드 상단 필터/정렬 */}
      {!isCompact && (
        <>
          <div className="mb-5 flex items-center gap-3 pl-5">
            <button
              type="button"
              onClick={onResetFilters}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 disabled:opacity-50"
              disabled={!hasAnyFilter}
            >
              <Reset className="h-4 w-4" />
            </button>

            <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar pr-1">
              <FilterChips chips={filterChips} />
            </div>
          </div>

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
                      onSelectSort={(sort) => setCurrentSort(sort)}
                      onClose={() => setIsSortOpen(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 공통 리스트 */}
      <div className="mb-10 space-y-3 px-5">
        {renderItems.map((book) => {
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

export default BookResults;
