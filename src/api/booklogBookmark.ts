import { privateApi } from "./axiosConfig";

export type BookmarkToggleResponse = {
  bookmarkedByMe: boolean;
  bookmarkCount: number;
};

export const toggleBooklogBookmark = async (postId: number): Promise<BookmarkToggleResponse> => {
  const { data } = await privateApi.post(`/booklogs/${postId}/bookmark/toggle`);
  return data;
}
