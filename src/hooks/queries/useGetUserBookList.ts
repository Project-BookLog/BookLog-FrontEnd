import { useQuery } from "@tanstack/react-query";
import { BOOK_ORDER } from "../../enum/book";
import type { BookStatus } from "../../types/book.types";
import { QUERY_KEY } from "../../constants/key";
import { getUserBookList } from "../../api/userBooks";

export function useGetUserBookList (shelfId?: number, status?: BookStatus, sort: BOOK_ORDER = BOOK_ORDER.LATEST) {
    return useQuery({
        queryKey: [QUERY_KEY.books, shelfId, status, sort],
        queryFn: () => getUserBookList(shelfId, status, sort),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}