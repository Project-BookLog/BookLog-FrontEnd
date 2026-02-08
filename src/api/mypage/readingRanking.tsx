import { privateApi } from "../axiosConfig";
import type { ReadingRankingResponse } from "../../types/myPage/readingRanking.types";


export const getTopReadingRanking = async (
  month: string
): Promise<ReadingRankingResponse> => {
  const { data } = await privateApi.get(
    "/me/friends/reading-ranking",
    { params: { month } }
  );

  return data.data;
};

export const getReadingRankingList = async (
  month: string,
  cursor?: number,
  size = 20
): Promise<ReadingRankingResponse> => {
  const { data } = await privateApi.get(
    "/me/friends/reading-ranking",
    {
      params: { month, cursor, size },
    }
  );

  return data.data;
};
