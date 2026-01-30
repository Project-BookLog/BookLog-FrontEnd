import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getShelves } from "../../api/shelf";
import type { Shelf } from "../../types/library";
import { BOOK_ORDER } from "../../enum/book";

export function useGetShelves () {
    return useQuery({
        queryKey: [QUERY_KEY.shelves],
        queryFn: () => getShelves(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        select: (shelves) => {
            const allBooksShelf: Shelf = {
                shelfId: -1,
                name: "전체 도서",
                isPublic: false,
                setOrder: BOOK_ORDER.LATEST,
                previewBooks: shelves
                    .flatMap((shelf) => shelf.previewBooks)
                    .filter((book, index, self) => index === self.findIndex((b) => b.bookId === book.bookId))
                    .slice(0, 3),
            };
            return [allBooksShelf, ...shelves];
        },
    });
}