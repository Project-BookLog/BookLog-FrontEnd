import type { Shelf } from "../types/library";
import { publicApi } from "./axiosConfig";

export const getShelves = async (): Promise<Shelf[]> => {
    const {data} = await publicApi.get("/api/v1/shelves");
    return data;
}