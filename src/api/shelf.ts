import type { Shelf } from "../types/library";
import { publicApi } from "./axiosConfig";

export const getShelves = async (userId: number): Promise<Shelf[]> => {
    const {data} = await publicApi.get("/api/v1/shelves", {
        headers: {"X-USER-ID": userId}
    });
    return data;
}