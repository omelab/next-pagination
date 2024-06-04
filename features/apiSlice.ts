// features/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface File {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

interface GetFilesResponse {
  meta: Meta;
  data: File[];
}

// Add your base URL here
const BASE_URL = process.env.NEXT_PUBLIC_API_URI;
const token =
  'MTQ.foro8Laltjr2dSC0kQ3rl2gkw7lhUyVzAaKpEU04gBQedXxnHZJXkAfxJZEk';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery, // fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3004/api' }),
  endpoints: (builder) => ({
    getFiles: builder.query<GetFilesResponse, number>({
      query: (page = 1, limit = 1) => `/medias?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetFilesQuery } = apiSlice;
