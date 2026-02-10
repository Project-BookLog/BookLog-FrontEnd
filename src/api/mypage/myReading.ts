import { privateApi } from "../axiosConfig";
import type { ReadingCalendarResponse, ReadingStatusResponse } from "../../types/myPage/myReading.types";

export const getReadingStatus = async (
  month: string
): Promise<ReadingStatusResponse> => {
  const { data } = await privateApi.get(
    "/me/reading-status",
    { params: { month } }
  );

  return data.data;
};

export const getReadingCalendar = async (month?: string) => {
  const { data } = await privateApi.get<ReadingCalendarResponse>(
    "/me/reading-calendar",
    { params: month ? { month } : undefined }
  );
  return data;
};