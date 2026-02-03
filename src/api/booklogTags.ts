// src/api/booklogTags.ts
import { privateApi } from "./axiosConfig";

export type TagOption = {
  tagId: number;
  name: string;
};

export type BooklogTagOptionsResponse = {
  mood: TagOption[];
  style: TagOption[];
  immersion: TagOption[];
};

export async function getBooklogTagOptions() {
  const res = await privateApi.get<BooklogTagOptionsResponse>(
    "/booklogs/tags/options"
  );
  return res.data;
}
