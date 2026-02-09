import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestDeleteUserBooksDto } from "../../types/library";
import type { BookStatus } from "../../types/book.types";
import { deleteUserBookList } from "../../api/userBooks";
import { QUERY_KEY } from "../../constants/key";

interface DeleteBookListVariables {
  body: RequestDeleteUserBooksDto;
  shelfId?: number;
  status?: BookStatus;
}

export function useDeleteBookList () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ body, shelfId, status }: DeleteBookListVariables) =>
            deleteUserBookList(body, shelfId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.books],});
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.shelves] });
        },
    })
}