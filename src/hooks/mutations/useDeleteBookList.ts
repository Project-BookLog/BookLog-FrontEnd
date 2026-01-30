import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestDeleteUserBooksDto } from "../../types/library";
import type { BookStatus } from "../../types/book.types";
import { deleteBookList } from "../../api/userBooks";
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
            deleteBookList(body, shelfId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.books],});
        },
    })
}