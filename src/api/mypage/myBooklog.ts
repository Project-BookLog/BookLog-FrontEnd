import type { ResponseGetMyBooklogDto } from "../../types/myPage/myBooklog";
import { privateApi } from "../axiosConfig";

export const getMyBooklog = async ({page = 0, size = 20, sort} : {page?: number; size?: number; sort?: string[]}): Promise<ResponseGetMyBooklogDto> => {
    const { data } = await privateApi.get("/me/booklogs", { params: { page, size, sort } });
    return data;
}

export const getMyBookmarkedBooklog = async ({page = 0, size = 20, sort} : {page?: number; size?: number; sort?: string[]}): Promise<ResponseGetMyBooklogDto> => {
    const { data } = await privateApi.get("/me/booklogs/bookmarks", { params: { page, size, sort } });
    return data;
}

export const getUserPublicBooklog = async (
    userId: number,
    { page = 0, size = 20 }: { page?: number; size?: number }
): Promise<ResponseGetMyBooklogDto> => {
    const { data } = await privateApi.get(`/users/${userId}/booklogs`, {
        params: { visibility: "PUBLIC", page, size },
    });
    return data;
}
