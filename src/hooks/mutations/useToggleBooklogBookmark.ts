import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBooklogBookmark } from "../../api/booklogBookmark";
import { QUERY_KEY } from "../../constants/key";

export function useToggleBooklogBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: number }) => toggleBooklogBookmark(postId),

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.booklogs] });

      const previousData = queryClient.getQueryData<any>([QUERY_KEY.booklogs]);

      queryClient.setQueryData([QUERY_KEY.booklogs], (oldData: any) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((item: any) => {
                if (item.postId === postId) {
                  return {
                    ...item,
                    bookmarkedByMe: !item.bookmarkedByMe,
                    bookmarkCount: item.bookmarkedByMe
                      ? item.bookmarkCount - 1
                      : item.bookmarkCount + 1,
                  };
                }
                return item;
              }),
            },
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEY.booklogs], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.booklogs] });
    },
  });
}
