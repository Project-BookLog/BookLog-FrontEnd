import { publicApi } from '../api/axiosConfig';
import type { BookResponse } from '../types/book';

interface SearchOptions {
  page?: number;
  size?: number;
}

// 컴포넌트에서 직관적 호출
export const searchBooks = async (
  query: string, 
  options: SearchOptions = {}
): Promise<BookResponse> => {
  const params = {
    query,               
    page: options.page || 1,
    size: options.size || 10,
  };
  
  console.log('🔍 검색 파라미터:', params);
  const { data } = await publicApi.get<BookResponse>('/search/books', { params });
  return data;
};
