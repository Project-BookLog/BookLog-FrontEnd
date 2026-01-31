import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShelf } from "../../api/shelf";
import { QUERY_KEY } from "../../constants/key";

export const useDeleteShelf = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (shelfId: number) => deleteShelf(shelfId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.shelves],
            });
        },
    });
};