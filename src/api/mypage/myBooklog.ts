import type { ResponseGetMyBooklogDto } from "../../types/myPage/myBooklig";
import { privateApi } from "../axiosConfig";

export const getMyBooklog = async ({page = 0, size = 20, sort} : {page?: number; size?: number; sort?: string[]}): Promise<ResponseGetMyBooklogDto> => {
    const { data } = await privateApi.get("/me/booklogs", { params: { page, size, sort } });
    return data;
}