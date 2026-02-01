import { useMutation, useQueryClient } from "@tanstack/react-query"
import { patchShelf } from "../../api/shelf";
import type { RequestPostShelfDto } from "../../types/library";
import { QUERY_KEY } from "../../constants/key";

export const usePatchShefl = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ shelfId, body }: { shelfId: number, body: RequestPostShelfDto}) => patchShelf(shelfId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.shelves] });
        }
    })
}