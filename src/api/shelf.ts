import type { Shelf } from "../types/library";
import { privateApi } from "./axiosConfig";

export const getShelves = async (): Promise<Shelf[]> => {
    const {data} = await privateApi.get("/api/v1/shelves");
    return data;
}