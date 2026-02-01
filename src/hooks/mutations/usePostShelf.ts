import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestPostShelfDto } from "../../types/library"
import { postShelf } from "../../api/shelf"
import { QUERY_KEY } from "../../constants/key";

export const usePostShelf = () => {
     const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: RequestPostShelfDto) => postShelf(body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.shelves],});
        },
    })
}