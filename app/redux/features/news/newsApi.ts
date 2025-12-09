import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  INews,
  INewsPayload,
  INewsUpdatePayload,
  NewsApiResponse,
} from "@/types/news";

// Removed: interface GetNewsByIdResponse { data: INews; } - No longer needed

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/news/" }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    // Get all news by category
    getNews: builder.query<
      NewsApiResponse,
      { category?: string; limit?: number }
    >({
      query: ({ category = "all", limit = 10 } = {}) => ({
        url: `?category=${encodeURIComponent(category)}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "News" as const,
                id: _id,
              })),
              { type: "News", id: "LIST" },
            ]
          : [{ type: "News", id: "LIST" }],
    }),

    // Get single news by ID (UPDATED)
    getNewsById: builder.query<INews, string>({
      query: (id) => ({
        url: id,
        method: "GET",
      }),
      // --- REMOVED: transformResponse is removed to expect INews directly
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),

    // Add news
    addNews: builder.mutation<INews, INewsPayload>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),

    // Update news
    updateNews: builder.mutation<INews, INewsUpdatePayload>({
      query: ({ id, data }) => ({
        url: id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "News", id }],
    }),

    // Delete news
    deleteNews: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "News", id },
        { type: "News", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useAddNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
