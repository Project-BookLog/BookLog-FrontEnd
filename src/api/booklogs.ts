// src/api/booklogs.ts
import { privateApi } from "./axiosConfig";
import type { BooklogDetailResponse } from "../types/booklogDetail.types";

/** ---------------- 북로그 상세 ---------------- */
export const getBooklogDetail = async (postId: number) => {
  const res = await privateApi.get<BooklogDetailResponse>(`/booklogs/${postId}`);
  return res.data;
};

/** ---------------- 이미지 업로드 ---------------- */
export type UploadBooklogImagesResponse = {
  imageUrls: string[];
};

export const uploadBooklogImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file); 
  });

  const res = await privateApi.post<{
    isSuccess: boolean;
    result: UploadBooklogImagesResponse;
  }>("/booklogs/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.result.imageUrls;
};

/** ---------------- 북로그 발행 ---------------- */
export type CreateBooklogRequest = {
  bookId: number;
  title: string;
  content: string;
  tagIds: number[];
  imageUrls: string[];
};

export type CreateBooklogResponse = {
  postId: number;
};

export const createBooklog = async (payload: CreateBooklogRequest) => {
  const res = await privateApi.post<CreateBooklogResponse>(
    "/booklogs",
    payload
  );
  return res.data;
};

/** ---------------- 북로그 삭제 ---------------- */
export const deleteBooklog = async (postId: number) => {
  const res = await privateApi.delete<{ postId: number }>(`/booklogs/${postId}`);
  return res.data;
};
