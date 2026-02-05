import { privateApi } from "../api/axiosConfig";
import type { ReadingCalendarResponse } from "../types/myReading.types";

export const getReadingCalendar = async (month?: string) => {
  const { data } = await privateApi.get<ReadingCalendarResponse>(
    "/me/reading-calendar",
    { params: month ? { month } : undefined }
  );
  return data;
};