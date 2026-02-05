// src/api/publicUserShelves.ts
import { privateApi } from "./axiosConfig";
import type { ResponsePublicUserShelvesDto } from "../types/publicShelves.types";

export function getPublicUserShelvesPreview(userId: number, size = 3) {
  return privateApi.get<ResponsePublicUserShelvesDto>(`/users/${userId}/shelves`, {
    params: {
      visibility: "PUBLIC",
      size,
    },
  });
}

export function getPublicUserShelves(
  userId: number,
  params?: { page?: number; size?: number }
) {
  return privateApi.get<ResponsePublicUserShelvesDto>(`/users/${userId}/shelves`, {
    params: {
      visibility: "PUBLIC",
      page: params?.page,
      size: params?.size,
    },
  });
}