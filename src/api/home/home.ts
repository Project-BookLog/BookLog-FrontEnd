import { privateApi } from "../axiosConfig";
import type { HomeResponse } from "../../types/home/home.types";

export const getHome = async (): Promise<HomeResponse> => {
  const { data } = await privateApi.get<HomeResponse>("/home");
  return data;
};
