import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { BackIcon, Default_BookImg } from "../../../assets/icons";
import { SortDropDown } from "../../common/dropdown/SortDropDown";
import { FilterChips, type FilterChip } from "../../common/FilterChips";
import { BOOK_ORDER, sortOptions } from "../../../enum/book";
import { useFilter } from "../../../hooks/useFilter";
import type { AuthorBook } from "../../../types/home/detail.types";

type FilterKey = "mood" | "style" | "immersion";

type Props = {
  books: AuthorBook[];
};

function AuthorBooks({ books }: Props) {
  const navigate = useNavigate();
  const { authorid } = useParams<{ authorid: string }>();
  const [searchParams] = useSearchParams();
  const { setPageInfo } = useFilter("author");

  const [currentSort, setCurrentSort] = useState<BOOK_ORDER>(
    BOOK_ORDER.LATEST
  );
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<FilterKey, string>>
  >({});


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedFilters({
      mood: searchParams.get("mood") || undefined,
      style: searchParams.get("style") || undefined,
      immersion: searchParams.get("immersion") || undefined,
    });
  }, [searchParams]);


  const processedBooks = useMemo(() => {
    let filtered = [...books];

    if (selectedFilters.mood) {
      filtered = filtered.filter(
        (b) => b.tasteInfo?.mood === selectedFilters.mood
      );
    }

    if (selectedFilters.style) {
      filtered = filtered.filter(
        (b) => b.tasteInfo?.style === selectedFilters.style
      );
    }

    if (selectedFilters.immersion) {
      filtered = filtered.filter(
        (b) =>
          b.tasteInfo?.immersion === selectedFilters.immersion
      );
    }

    switch (currentSort) { //api보고 재조정 필요 
      case BOOK_ORDER.LATEST:
        return filtered.reverse();

      case BOOK_ORDER.OLDEST:
        return filtered;

      case BOOK_ORDER.TITLE:
        return filtered.sort((a, b) =>
          a.title.localeCompare(b.title, "ko", {
            sensitivity: "base",
          })
        );

      default:
        return filtered;
    }
  }, [books, selectedFilters, currentSort]);


  const goFilter = (from: FilterKey) => {
    if (!authorid) return;

    setPageInfo({
      returnUrl: window.location.pathname,
      preserveQuery: [],
    });

    const params = new URLSearchParams();
    params.set("from", from);

    navigate(`/author/${authorid}/filter?${params.toString()}`);
  };

  
  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("mood");
    params.delete("style");
    params.delete("immersion");

    navigate(`${window.location.pathname}?${params.toString()}`, {
      replace: true,
    });
  };

  const filterChips: FilterChip[] = [
    {
      key: "mood",
      label: selectedFilters.mood || "분위기",
      isActive: !!selectedFilters.mood,
      onClick: () => goFilter("mood"),
    },
    {
      key: "style",
      label: selectedFilters.style || "문체",
      isActive: !!selectedFilters.style,
      onClick: () => goFilter("style"),
    },
    {
      key: "immersion",
      label: selectedFilters.immersion || "몰입도",
      isActive: !!selectedFilters.immersion,
      onClick: () => goFilter("immersion"),
    },
  ];

  const hasAnyFilter = Object.values(selectedFilters).some(Boolean);

  const currentSortLabel =
    sortOptions.find((o) => o.value === currentSort)?.label ??
    "정렬";

  if (!books || books.length === 0) return null;

  return (
    <section className="relative">
      {isSortOpen && (
        <button
          type="button"
          onClick={() => setIsSortOpen(false)}
          className="fixed inset-0 z-40 bg-b-op15/20 backdrop-blur-[4px]"
        />
      )}


      <div className="mb-5 flex items-center gap-3 pl-5">
        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto pr-1">
          <FilterChips
            chips={filterChips}
            hasAnyFilter={hasAnyFilter}
            onReset={handleResetFilters}
          />
        </div>
      </div>


      <div className="mb-3 flex items-center justify-between px-5">
        <p className="text-body-03 text-gray-600">
          총 <span className="text-primary">
            {processedBooks.length}
          </span>
          권
        </p>

        <div className="relative z-50 inline-flex">
          <button
            type="button"
            className="flex items-center gap-1 text-body-03 text-gray-600"
            onClick={() =>
              setIsSortOpen((prev) => !prev)
            }
          >
            <span>{currentSortLabel}</span>
            <BackIcon className="h-4 w-4 rotate-270" />
          </button>

          {isSortOpen && (
            <div className="pointer-events-none">
              <div className="pointer-events-auto mt-3 translate-x-5">
                <SortDropDown
                  currentSort={currentSort}
                  onSelectSort={(sort) =>
                    setCurrentSort(sort)
                  }
                  onClose={() =>
                    setIsSortOpen(false)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>

 
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 px-5 pb-10">
        {processedBooks.map((book) => (
          <button
            key={book.bookId}
            type="button"
            className="text-left"
            onClick={() =>
              navigate(`/book/${book.bookId}`)
            }
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

            <p className="mt-2 line-clamp-2 text-caption-01 font-medium">
              {book.title ?? "-"}
            </p>

            <p className="mt-1 truncate text-caption-02 text-gray-500">
              {book.authorName ?? "-"}
              <span className="text-gray-400">, </span>
              {book.publisherName ?? "-"}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AuthorBooks;
