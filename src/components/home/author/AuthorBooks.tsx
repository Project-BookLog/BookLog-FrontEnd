import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackIcon, Reset } from "../../../assets/icons";
import { SortDropDown } from "../../common/dropdown/SortDropDown";
import { BOOK_ORDER, sortOptions } from "../../../enum/book";
import { FilterChips, type FilterChip } from "../../common/FilterChips";
import { useFilter } from "../../../hooks/useFilter";

const DUMMY_BOOKS = [
  {
    bookId: 1,
    title: "책 제목",
    thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg",
    authors: "저자명",
    author: "저자명", 
    publisherName: "출판사",
    publisher: "출판사",
    createdAt: "2021-01-01",
    mood: "잔잔한",
  },
  {
    bookId: 2,
    title: "책 제목",
    thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg",
    authors: "저자명",
    author: "저자명",
    publisherName: "출판사",
    publisher: "출판사",
    createdAt: "2020-05-15",
    style: "서술적",
  },
  {
    bookId: 3,
    title: "책 제목",
    thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg",
    authors: "저자명",
    author: "저자명",
    publisherName: "출판사",
    publisher: "출판사",
    createdAt: "2019-03-10",
  },
  {
    bookId: 4,
    title: "책 제목",
    thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg",
    authors: "저자명",
    author: "저자명",
    publisherName: "출판사",
    publisher: "출판사",
    createdAt: "2022-08-20",
    immersion: "높음",
  },
  {
    bookId: 5,
    title: "책 제목",
    thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg",
    authors: "저자명",
    author: "저자명",
    publisherName: "출판사",
    publisher: "출판사",
    createdAt: "2023-11-05",
    mood: "신비로운",
  },
  {
    bookId: 6,
    title: "책 제목",
    thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg",
    authors: "저자명",
    author: "저자명",
    publisherName: "출판사",
    publisher: "출판사",
    createdAt: "2024-02-14",
  },
];

type FilterKey = "mood" | "style" | "immersion";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Book {
  bookId: number;
  title: string;
  thumbnailUrl: string;
  authors: string;
  author: string;
  publisherName: string;
  publisher: string;
  createdAt: string;
  mood?: string;
  style?: string;
  immersion?: string;
}

function AuthorBooks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setPageInfo } = useFilter();

  const [currentSort, setCurrentSort] = useState<BOOK_ORDER>(BOOK_ORDER.LATEST);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<FilterKey, string>>
  >({});

  
  useEffect(() => {
    const mood = searchParams.get("mood");
    const style = searchParams.get("style");
    const immersion = searchParams.get("immersion");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedFilters({
      mood: mood || undefined,
      style: style || undefined,
      immersion: immersion || undefined,
    });
  }, [searchParams]);

  const currentSortLabel =
    sortOptions.find((o) => o.value === currentSort)?.label ?? "정렬";

  const sortedItems = useMemo(() => {
    let filtered = [...DUMMY_BOOKS];

    if (selectedFilters.mood) {
      filtered = filtered.filter((book) => book.mood === selectedFilters.mood);
    }
    if (selectedFilters.style) {
      filtered = filtered.filter((book) => book.style === selectedFilters.style);
    }
    if (selectedFilters.immersion) {
      filtered = filtered.filter((book) => book.immersion === selectedFilters.immersion);
    }

    switch (currentSort) {
      case BOOK_ORDER.LATEST:
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case BOOK_ORDER.OLDEST:
        return filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case BOOK_ORDER.TITLE:
        return filtered.sort((a, b) => a.title.localeCompare(b.title, "ko", { sensitivity: "base" }));
      default:
        return filtered;
    }
  }, [currentSort, selectedFilters]);

  const handleBookClick = () => {
    // navigate(`/book/${bookId}`);
    navigate("/bookdetail");
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("mood");
    params.delete("style");
    params.delete("immersion");
    navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
  };


  const goFilter = (from: FilterKey) => {
    setPageInfo({ 
      returnUrl: window.location.pathname, 
      preserveQuery: [] 
    });
    const params = new URLSearchParams();
    params.set("from", from);
    navigate(`/authordetail/filter?${params.toString()}`);
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

  return (
    <section className="relative">
      {isSortOpen && (
        <button
          type="button"
          onClick={() => setIsSortOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
        />
      )}

      {/* 상단 필터/정렬 바 */}
      <div className="mb-5 flex items-center gap-3 pl-5">
        <button
          type="button"
          onClick={handleResetFilters}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-100 disabled:opacity-50"
          disabled={!hasAnyFilter}
        >
          <Reset className="h-4 w-4" />
        </button>

        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto pr-1">
          <FilterChips chips={filterChips} />
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between px-5">
        <p className="text-body-03 text-gray-600">
          총 <span className="text-primary">{sortedItems.length}</span>권
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

      {/* 2열 그리드 도서 리스트 */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 px-5 pb-10">
        {sortedItems.map((book) => (
          <button
            key={book.bookId}
            type="button"
            className="text-left"
            onClick={() => handleBookClick()}
          >
            <div className="h-36 w-full overflow-hidden rounded">
              <img
                src={book.thumbnailUrl}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 line-clamp-2 text-caption-01 font-medium">
              {book.title}
            </p>
            <p className="mt-1 truncate text-caption-02 text-gray-500">
              {book.authors}
              <span className="text-gray-300"> | </span>
              {book.publisherName}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AuthorBooks;
