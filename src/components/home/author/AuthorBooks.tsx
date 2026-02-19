import { useMemo, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { BackIcon, Default_BookImg } from "../../../assets/icons";
import { SortDropDown } from "../../common/dropdown/SortDropDown";
import { FilterChips, type FilterChip, type FilterKey } from "../../common/FilterChips";
import { BOOK_ORDER, sortOptions } from "../../../enum/book";
import type { AuthorBook } from "../../../types/home/detail.types";

type Props = {
  books: AuthorBook[];
};

const FILTER_KEYS: FilterKey[] = ["mood", "style", "immersion"];

const FILTER_LABELS: Record<FilterKey, string> = {
  mood: "분위기",
  style: "문체",
  immersion: "몰입도",
};

function AuthorBooks({ books }: Props) {
  const navigate = useNavigate();
  const { authorid } = useParams<{ authorid: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortOrder, setSortOrder] = useState<BOOK_ORDER>(BOOK_ORDER.LATEST);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredSortOptions = useMemo(() => {
    return sortOptions.filter(
      (option) => option.value !== BOOK_ORDER.AUTHOR
    );
  }, []);

  const selectedFilters = useMemo(() => {
    return FILTER_KEYS.reduce((acc, key) => {
      const raw = searchParams.get(key);
      if (raw) acc[key] = raw.split(",");
      return acc;
    }, {} as Partial<Record<FilterKey, string[]>>);
  }, [searchParams]);

const normalize = (v?: string | null) =>
  v?.replace(/^#/, "").trim() ?? "";

const filteredBooks = useMemo(() => {
  const noFilter =
    !selectedFilters.mood?.length &&
    !selectedFilters.style?.length &&
    !selectedFilters.immersion?.length;

  if (noFilter) return books;

  return books.filter((book) => {
    const mood = normalize(book.tasteInfo?.mood);
    const style = normalize(book.tasteInfo?.style);
    const immersion = normalize(book.tasteInfo?.immersion);

    const moodMatch =
      selectedFilters.mood?.includes(mood);

    const styleMatch =
      selectedFilters.style?.includes(style);

    const immersionMatch =
      selectedFilters.immersion?.includes(immersion);

    return moodMatch || styleMatch || immersionMatch;
  });
}, [books, selectedFilters]);




  const sortedBooks = useMemo(() => {
    const copied = [...filteredBooks];

    switch (sortOrder) {
      case BOOK_ORDER.LATEST:
        return copied.reverse();

      case BOOK_ORDER.OLDEST:
        return copied;

      case BOOK_ORDER.TITLE:
        return copied.sort((a, b) =>
          a.title.localeCompare(b.title, "ko", { sensitivity: "base" })
        );

      default:
        return copied;
    }
  }, [filteredBooks, sortOrder]);


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
      navigate(`/author/${authorid}/filter?from=${key}`, {
        state: {
          returnUrl: `/author/${authorid}`,
          preserveQuery: []
        }
      });

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

  const currentSortLabel =
    sortOptions.find((o) => o.value === sortOrder)?.label ?? "정렬";

  if (!books || books.length === 0) return null;

  return (
    <section className="relative">

      {/* 필터 칩 */}
      <div className="mb-5 flex items-center gap-3 pl-5">
        <FilterChips
          chips={filterChips}
          hasAnyFilter={hasAnyFilter}
          onReset={handleResetFilters}
        />
      </div>

      {/* 결과 + 정렬 */}
      <div className="mb-3 flex items-center justify-between px-5">
        <p className="text-body-03 text-gray-600">
          총 <span className="text-primary">{sortedBooks.length}</span>권
        </p>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 text-body-03 text-gray-600"
            onClick={() => setIsSortOpen((prev) => !prev)}
          >
            <span>{currentSortLabel}</span>
            <BackIcon className="h-4 w-4 rotate-270" />
          </button>

          {isSortOpen && (
            <SortDropDown
              currentSort={sortOrder}
              options={filteredSortOptions}
              onSelectSort={(order) => {
                setSortOrder(order);
                setIsSortOpen(false);
              }}
              onClose={() => setIsSortOpen(false)}
            />
          )}
        </div>
      </div>


      {/* 도서 목록 */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 px-5 pb-10">
        {sortedBooks.map((book) => (
          <button
            key={book.bookId}
            type="button"
            className="text-left"
            onClick={() => navigate(`/book/${book.bookId}`)}
          >
            <div className="h-36 w-full overflow-hidden rounded">
              {book.thumbnailUrl ? (
                <img
                  src={book.thumbnailUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Default_BookImg className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex flex-col min-h-[71px]">
              <p className="mt-2 line-clamp-2 text-subtitle-02-sb text-black">
                {book.title ?? "-"}
              </p>

              <p className="mt-1 truncate text-caption-02 text-gray-500">
                {book.authorName ?? "-"}
                <span className="text-gray-400">, </span>
                {book.publisherName ?? "-"}
              </p>
            </div>

          </button>
        ))}
      </div>
    </section>
  );
}

export default AuthorBooks;
