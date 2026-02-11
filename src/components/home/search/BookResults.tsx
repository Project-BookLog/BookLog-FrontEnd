import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import type { Book } from "../../../types/book.types";
import { FilterChips, type FilterChip, type FilterKey } from "../../common/FilterChips";
import { SortDropDown } from "../../common/dropdown/SortDropDown";
import { BOOK_ORDER, sortOptions } from "../../../enum/book";
import { ArrowDown } from "../../../assets/icons";

type Props = {
  // total: number;
  items: Book[];
};

const FILTER_KEYS: FilterKey[] = ["mood", "style", "immersion"];

const FILTER_LABELS: Record<FilterKey, string> = {
  mood: "분위기",
  style: "문체",
  immersion: "몰입도",
};

export default function BookResults({ /*total,*/ items }: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortOrder, setSortOrder] = useState<BOOK_ORDER>(BOOK_ORDER.LATEST);
  const [isSortDropDownOpen, setIsSortDropDownOpen] = useState(false);


  // 필터관련 
  const selectedFilters = useMemo(() => {
    return FILTER_KEYS.reduce((acc, key) => {
      const raw = searchParams.get(key);
      if (raw) acc[key] = raw.split(",");
      return acc;
    }, {} as Partial<Record<FilterKey, string[]>>);
  }, [searchParams]);

  const selectedTagSet = useMemo(() => {
    return new Set(
      Object.values(selectedFilters)
        .flat()
        .filter(Boolean)
        .map((tag) => `#${tag}`)
    );
  }, [selectedFilters]);


  const filteredItems = useMemo(() => {
    if (selectedTagSet.size === 0) return items;
    return items.filter((book) =>
      book.tags?.some((tag) => selectedTagSet.has(tag))
    );
  }, [items, selectedTagSet]);



  //정렬관련
  const currentSortLabel = sortOptions.find(
    (option) => option.value === sortOrder
  )?.label;

  const sortedItems = useMemo(() => {
    const copied = [...filteredItems];

    const getTime = (d?: string, fallback = -Infinity) => {
      if (!d) return fallback;
      const t = new Date(d).getTime();
      return Number.isNaN(t) ? fallback : t;
    };

    switch (sortOrder) {
      case BOOK_ORDER.LATEST: 
        return copied.sort(
          (a, b) => getTime(b.publishedDate, -Infinity) - getTime(a.publishedDate, -Infinity)
        );

      case BOOK_ORDER.OLDEST:
        return copied.sort(
          (a, b) => getTime(a.publishedDate, Infinity) - getTime(b.publishedDate, Infinity)
        );

      case BOOK_ORDER.TITLE:
        return copied.sort((a, b) => a.title.localeCompare(b.title));

      case BOOK_ORDER.AUTHOR:
        return copied.sort((a, b) => (a.authors[0] ?? "").localeCompare(b.authors[0] ?? ""));

      default:
        return copied;
    }
  }, [filteredItems, sortOrder]);


  const filterChips: FilterChip[] = FILTER_KEYS.map((key) => {
    const values = selectedFilters[key];

    return {
      key,
      label:
        values && values.length > 0
          ? values.join(", ")
          : FILTER_LABELS[key],
      isActive: Boolean(values && values.length > 0),
      onClick: () => {
        navigate(`/search/filter?from=${key}&${searchParams.toString()}`);
      },
    };
  });

  const hasAnyFilter = Object.values(selectedFilters).some(
    (v) => v && v.length > 0
  );

  const handleResetFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      FILTER_KEYS.forEach((key) => { next.delete(key); });
      return next;
    });
  };


  return (
    <>
      {/* 오버레이 */}
      {isSortDropDownOpen && (
        <div
          className="fixed inset-0 z-40 bg-b-op15 backdrop-blur-[4px]"
          onClick={() => setIsSortDropDownOpen(false)}
        />
      )}

      {/* 필터 칩 */}
      <section className="pl-5 mb-4">
        <FilterChips
          chips={filterChips}
          hasAnyFilter={hasAnyFilter}
          onReset={handleResetFilters}
        />
      </section>

      {/* 결과 + 정렬 */}
      <section className="relative bg-bg">
        <div className="relative mb-3 flex items-center justify-between px-5">
          <p className="text-body-03 text-gray-600">
            {/* 총{" "}
            <span className="text-primary">{sortedItems.length}</span>권
            {sortedItems.length !== total && (
              <span className="text-gray-400"> / 전체 {total}권</span>
            )} */}
          </p>

          <button
            className="flex items-center gap-[2px]"
            onClick={() => setIsSortDropDownOpen((v) => !v)}
          >
            <p className="text-gray-600 text-body-03">
              {currentSortLabel}
            </p>
            <ArrowDown className="w-[14px] h-[14px]" />
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

        {/* 리스트 */}
        <div className="mb-10 space-y-3 px-5">
          {sortedItems.map((book) => (
            <button
              key={book.bookId}
              type="button"
              className="flex w-full items-center gap-5"
              onClick={() => navigate(`/book/${book.bookId}`)}
            >
              <div className="flex h-26 w-17 items-center justify-center overflow-hidden rounded bg-gray-100">
                {book.thumbnailUrl && (
                  <img
                    src={book.thumbnailUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-subtitle-02-sb truncate">
                  {book.title}
                </p>
                <p className="text-caption-02 truncate text-gray-600">
                  {book.authors?.[0] ?? "저자 미상"}
                  <span className="text-gray-400"> | </span>
                  {book.publisherName}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
