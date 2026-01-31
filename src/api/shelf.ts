import type { RequestPostShelfDto, Shelf } from "../types/library";
import { privateApi } from "./axiosConfig";

export const getShelves = async (): Promise<Shelf[]> => {
    const {data} = await privateApi.get("/shelves");
    return data;
}

export const postShelf = async (body: RequestPostShelfDto) => {
    const {data} = await privateApi.post("/shelves", body);
    return data;
}

export const deleteShelf = async (shelfId: number) => {
    await privateApi.delete(`/shelves/${shelfId}`);
}