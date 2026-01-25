import { useQuery } from "@tanstack/react-query";
import { BOOK_ORDER } from "../../enum/book";
import type { BookStatus } from "../../types/book.types";
import { QUERY_KEY } from "../../constants/key";
import { getBookList } from "../../api/userBooks";

export function useGetBookList (userId: number, shelfId?: number, status?: BookStatus, sort: BOOK_ORDER = BOOK_ORDER.LATEST) {
    return useQuery({
        queryKey: [QUERY_KEY.books, userId, shelfId, status, sort],
        queryFn: () => getBookList(userId, shelfId, status, sort),
    })
}