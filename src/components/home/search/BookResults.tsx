import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import type { Book } from "../../../types/book.types";
import { FilterChips, type FilterChip } from "../../common/FilterChips";

type FilterKey = "mood" | "style" | "immersion";

type Props = {
  total: number;
  items: Book[];
};

const FILTER_KEYS: FilterKey[] = ["mood", "style", "immersion"];

const FILTER_LABELS: Record<FilterKey, string> = {
  mood: "분위기",
  style: "문체",
  immersion: "몰입도",
};

export default function BookResults({ total, items }: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  const selectedFilters = useMemo(() => {
    return FILTER_KEYS.reduce((acc, key) => {
      const raw = searchParams.get(key);
      if (raw) {
        acc[key] = raw.split(","); 
      }
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


  const filterChips: FilterChip[] = FILTER_KEYS.map((key) => {
    const values = selectedFilters[key];

    return {
      key,
      label: values && values.length > 0
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
      FILTER_KEYS.forEach((key) => next.delete(key));
      return next;
    });
  };

  /* =========================
   * 렌더
   * ========================= */
  return (
    <>
      {/* 필터 칩 */}
      <section className="pl-5 mb-4">
        <FilterChips
          chips={filterChips}
          hasAnyFilter={hasAnyFilter}
          onReset={handleResetFilters}
        />
      </section>

      {/* 결과 */}
      <section className="relative bg-bg">
        <div className="mb-3 flex items-center justify-between px-5">
          <p className="text-body-03 text-gray-600">
            총 <span className="text-primary">{filteredItems.length}</span>권
            {filteredItems.length !== total && (
              <span className="text-gray-400"> / 전체 {total}권</span>
            )}
          </p>
        </div>

        <div className="mb-10 space-y-3 px-5">
          {filteredItems.map((book) => (
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
                <p className="text-subtitle-02-sb truncate">{book.title}</p>
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
