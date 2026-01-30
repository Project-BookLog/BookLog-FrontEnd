import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Book, Author } from "../types/book.types";
import { searchBooks, searchAuthors, searchBoth } from "../api/search";
import type { BookSearchParams, AuthorSearchParams, SearchBothParams, SearchContextType } from "../types/search.types";

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

  const handleSearchBooks = useCallback(async (params: BookSearchParams) => {
    if (!params.query.trim()) return;
    setBookLoading(true);
    setBookError(null);
    try {
      const data = await searchBooks(params);
      setBookPage(data.page);
      setBookSize(data.size);
      setBookIsEnd(data.isEnd);
      setBookTotal(data.totalCount);
      setBookItems(data.items);
    } catch (e) {
      console.error("/search/books error:", e);
      setBookError("도서 검색 실패");
    } finally {
      setBookLoading(false);
    }
  }, []);

  const handleSearchAuthors = useCallback(async (params: AuthorSearchParams) => {
    if (!params.query.trim()) return;
    setAuthorLoading(true);
    setAuthorError(null);
    try {
      const data = await searchAuthors(params);
      setAuthorPage(data.page);
      setAuthorSize(data.size);
      setAuthorIsEnd(data.isEnd);
      setAuthorTotal(data.totalCount);
      setAuthorItems(data.items);
    } catch (e) {
      console.error("/search/authors error:", e);
      setAuthorError("작가 검색 실패");
    } finally {
      setAuthorLoading(false);
    }
  }, []);


  const handleSearchBoth = useCallback(async (params?: SearchBothParams) => {
    if (!keyword.trim()) return;

    setBothLoading(true);
    setBothError(null);

    try {
      const { book, author } = await searchBoth(keyword, params);

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
  }, [keyword]);

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
