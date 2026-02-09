import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBookDetail } from "../../api/userBooks";
import type { RequestPatchUserBookDto } from "../../types";
import { QUERY_KEY } from "../../constants/key";

export function usePatchBookDetail () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({userBookId, body}: {userBookId: number; body: RequestPatchUserBookDto;}) => patchBookDetail(userBookId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.book]});
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.shelves] });
        },
    });
};