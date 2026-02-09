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