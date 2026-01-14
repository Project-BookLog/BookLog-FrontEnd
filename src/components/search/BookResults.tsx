import React from "react";
import type { Book } from "../../types/book.types";
import { BackIcon, Reset } from "../../assets/icons";

type FilterKey = "mood" | "style" | "immersion";

type BookResultsProps = {
  keyword: string;
  total: number;
  items: Book[];
  mode?: "compact" | "full";
  onMoreClick?: () => void;

  // 필터 관련
  selectedFilters?: Partial<Record<FilterKey, string>>;
  onFilterChange?: (key: FilterKey, value: string) => void;
  onResetFilters?: () => void;
};

type FilterChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1 rounded-full border px-4 py-1",
        "text-body-01-m whitespace-nowrap h-9",
        isActive
          ? "border-primary bg-primary/5 text-primary"
          : "border-gray-200 bg-white text-gray-700",
      ].join(" ")}
    >
      <span>{label}</span>
      <BackIcon className="w-3 h-3 rotate-270" />
    </button>
  );
}

function BookResults({
  total,
  items,
  mode = "compact",
  onMoreClick,
  selectedFilters,
  onFilterChange,
  onResetFilters,
}: BookResultsProps) {
  const isCompact = mode === "compact";
  const showMoreButton = isCompact && total > items.length;

  return (
    <section className="px-6">
      {/* compact */}
      {isCompact && (
        <header className="mb-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-title-02 text-black">도서</h2>
            <span className="text-caption-01 text-primary">{total}권</span>
          </div>

          {showMoreButton && (
            <button
              type="button"
              className="text-xs text-gray-500"
              onClick={onMoreClick}
            >
              <BackIcon className="h-5 w-5 rotate-180" />
            </button>
          )}
        </header>
      )}

      {/* full */}
      {!isCompact && (
        <>
          <div className="mb-5 flex items-center gap-3">
            <button
              type="button"
              onClick={onResetFilters}
              className="flex h-9 w-9 bg-gray-100 items-center justify-center rounded-full border border-gray-200"
            >
              <Reset className="h-4 w-4" />
            </button>

            {/* 필터 */}
            <div className="flex flex-1 gap-2 overflow-x-auto">
              <FilterChip
                label="분위기"
                isActive={!!selectedFilters?.mood}
                onClick={() =>
                  onFilterChange?.(
                    "mood",
                    selectedFilters?.mood ? "" : "some-value",
                  )
                }
              />
              <FilterChip
                label="문체"
                isActive={!!selectedFilters?.style}
                onClick={() =>
                  onFilterChange?.(
                    "style",
                    selectedFilters?.style ? "" : "some-value",
                  )
                }
              />
              <FilterChip
                label="몰입도"
                isActive={!!selectedFilters?.immersion}
                onClick={() =>
                  onFilterChange?.(
                    "immersion",
                    selectedFilters?.immersion ? "" : "some-value",
                  )
                }
              />
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <p className="text-body-03 text-gray-600">
              총 <span className="text-primary">{total}</span>권
            </p>

            <button
              type="button"
              className="flex items-center gap-1 text-body-03 text-gray-600"
            >
              <span>최신 순</span>
              <BackIcon className="h-4 w-4 rotate-270" />
            </button>
          </div>
        </>
      )}

      {/* 공통 리스트 */}
      <div className="space-y-3 mb-10">
        {items.map((book) => {
          const { CoverIcon } = book;

          return (
            <button
              key={book.id}
              type="button"
              className="flex w-full items-center gap-5"
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
