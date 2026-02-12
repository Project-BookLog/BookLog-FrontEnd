import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserBookDetail } from "../../api/userBooks";
import { QUERY_KEY } from "../../constants/key";
import type { RequestPatchUserBookDto } from "../../types/book.types";

export function usePatchBookDetail () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({userBookId, body}: {userBookId: number; body: RequestPatchUserBookDto;}) => patchUserBookDetail(userBookId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.book]});
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.shelves] });
        },
    });
};