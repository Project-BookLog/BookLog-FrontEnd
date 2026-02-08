import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Book, Author } from "../types/book.types";
import { searchBooks, searchAuthors, searchBoth } from "../api/home/search";
import type { BookSearchParams, AuthorSearchParams, SearchBothParams, SearchContextType } from "../types/home/search.types";

const SearchContext = createContext<SearchContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  // 책
  const [bookPage, setBookPage] = useState(1);
  const [bookSize, setBookSize] = useState(10);
  const [bookIsEnd, setBookIsEnd] = useState(false);
  const [bookTotal, setBookTotal] = useState(0);
  const [bookItems, setBookItems] = useState<Book[]>([]);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  // 작가
  const [authorPage, setAuthorPage] = useState(1);
  const [authorSize, setAuthorSize] = useState(10);
  const [authorIsEnd, setAuthorIsEnd] = useState(false);
  const [authorTotal, setAuthorTotal] = useState(0);
  const [authorItems, setAuthorItems] = useState<Author[]>([]);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [authorError, setAuthorError] = useState<string | null>(null);

  // 통합
  const [keyword, setKeyword] = useState("");
  const [bothLoading, setBothLoading] = useState(false);
  const [bothError, setBothError] = useState<string | null>(null);

  const handleSearchBooks = useCallback(
    async (params: BookSearchParams & { loadMore?: boolean }) => {
      if (bookLoading) return;
      const query = params.query.trim();
      if (!query) return;
      if (params.loadMore && bookIsEnd) return;

      setBookLoading(true);
      setBookError(null);

      try {
        const nextPage = params.loadMore ? bookPage + 1 : 1;
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { loadMore, ...rest } = params;
        const data = await searchBooks({
          ...rest,
          page: nextPage,
          size: bookSize,
        });

        setBookPage(data.page);
        setBookIsEnd(data.isEnd);
        setBookTotal(data.totalCount);

        setBookItems(prev =>
          params.loadMore ? [...prev, ...data.items] : data.items
        );
      } catch (e) {
        console.error("/search/books error:", e);
        setBookError("도서 검색 실패");
      } finally {
        setBookLoading(false);
      }
    },
    [bookPage, bookIsEnd, bookSize, bookLoading]
  );


  const handleSearchAuthors = useCallback(
    async (params: AuthorSearchParams & { loadMore?: boolean }) => {
      if (authorLoading) return;
      const query = params.query.trim();
      if (!query) return;
      if (params.loadMore && authorIsEnd) return;

      setAuthorLoading(true);
      setAuthorError(null);

      try {
        const nextPage = params.loadMore ? authorPage + 1 : 1;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { loadMore, ...rest } = params;
        const data = await searchAuthors({
          ...rest,
          page: nextPage,
          size: authorSize,
        });

        setAuthorPage(data.page);
        setAuthorIsEnd(data.isEnd);
        setAuthorTotal(data.totalCount);

        setAuthorItems(prev =>
          params.loadMore ? [...prev, ...data.items] : data.items
        );
      } catch (e) {
        console.error("/search/authors error:", e);
        setAuthorError("작가 검색 실패");
      } finally {
        setAuthorLoading(false);
      }
    },
    [authorPage, authorIsEnd, authorSize, authorLoading]
  );


  const handleSearchBoth = useCallback(async (keyword: string, params?: SearchBothParams) => {
    const kw = keyword;
    if (!kw.trim()) return;

    setBothLoading(true);
    setBothError(null);

    try {
      const { book, author } = await searchBoth(kw, params);

      setBookTotal(book.totalCount);
      setBookItems(book.items);

      setAuthorTotal(author.totalCount);
      setAuthorItems(author.items);
    } catch (e) {
      console.error("searchBoth error:", e);
      setBothError("통합 검색 실패");
    } finally {
      setBothLoading(false);
    }
  }, []);

  const clearBooks = useCallback(() => {
    setBookPage(1);
    setBookSize(10);
    setBookIsEnd(false);
    setBookTotal(0);
    setBookItems([]);
    setBookLoading(false);
    setBookError(null);
  }, []);

  const clearAuthors = useCallback(() => {
    setAuthorPage(1);
    setAuthorSize(10);
    setAuthorIsEnd(false);
    setAuthorTotal(0);
    setAuthorItems([]);
    setAuthorLoading(false);
    setAuthorError(null);
  }, []);

  const clearBoth = useCallback(() => {
    clearBooks();
    clearAuthors();
    setKeyword("");
    setBothLoading(false);
    setBothError(null);
  }, [clearBooks, clearAuthors]);

  return (
    <SearchContext.Provider
      value={{
        // 책
        bookPage, bookSize, bookIsEnd, bookTotal, bookItems, bookLoading, bookError,
        // 작가
        authorPage, authorSize, authorIsEnd, authorTotal, authorItems, authorLoading, authorError,
        // 통합
        keyword, bothLoading, bothError,

        // actions
        setKeyword,
        searchBooks: handleSearchBooks,
        searchAuthors: handleSearchAuthors,
        searchBoth: handleSearchBoth,

        clearBooks,
        clearAuthors,
        clearBoth,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
