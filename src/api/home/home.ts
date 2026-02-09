import { privateApi } from "../axiosConfig";
import type { CurrentReadingBook, HomeResponse } from "../../types/home/home.types";

export const getHome = async (): Promise<HomeResponse> => {
  const { data } = await privateApi.get<HomeResponse>("/home");
  return data;
};


interface Response {
  count: number;
  items: CurrentReadingBook[];
}

export const getCurrentReadingBooks = async () => {
  const res = await privateApi.get<Response>(
    "/user-books/reading-books",
    { params: { limit: 10 } }
  );
  return res.data;
};
