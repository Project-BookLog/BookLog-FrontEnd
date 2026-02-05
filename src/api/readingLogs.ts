// src/api/readingLogs.ts
import { privateApi } from "./axiosConfig";

export type CreateReadingLogRequest = {
  readDate: string; // "YYYY-MM-DD"
  pagesRead: number;
};

export type CreateReadingLogResponse = {
  logId: number;
  userBookId: number;
  readDate: string; // "YYYY-MM-DD"
  pagesRead: number;
  currentPage: number;
};

export function createReadingLog(
  userBookId: number,
  body: CreateReadingLogRequest
) {
  return privateApi.post<CreateReadingLogResponse>(
    `/user-books/${userBookId}/reading-logs`,
    body
  );
}

export type UpdateReadingLogRequest = {
  readDate: string; // "YYYY-MM-DD"
  pagesRead: number;
};

export type UpdateReadingLogResponse = unknown;

export function updateReadingLog(logId: number, body: UpdateReadingLogRequest) {
  return privateApi.patch<UpdateReadingLogResponse>(`/reading-logs/${logId}`, body);
}