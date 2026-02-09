import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserBookTotalPage } from "../../api/userBooks";
import { QUERY_KEY } from "../../constants/key";

export function usePatchUserBookTotalPage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userBookId, pageCountSnapshot }: { userBookId: number; pageCountSnapshot: number }) => patchUserBookTotalPage(userBookId, pageCountSnapshot),
        onSuccess: (_, { userBookId }) => { queryClient.invalidateQueries({queryKey: [QUERY_KEY.book, userBookId]}); },
    });
}