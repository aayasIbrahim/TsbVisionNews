import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews, INewsPayload, INewsUpdatePayload } from "@/types/news";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/news/" }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    // Get all news
    getNews: builder.query<INews[], string>({
      query: (category = "all") => `?category=${encodeURIComponent(category)}`,
      providesTags: ["News"],
    }),

    // Get single news
    getNewsById: builder.query<INews, string>({
      query: (id) => `${id}`,
      providesTags: ["News"],
    }),

    // Create news
    addNews: builder.mutation<INews, INewsPayload>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    // Update news
    updateNews: builder.mutation<INews, INewsUpdatePayload>({
      query: ({ id, data }) => ({
        url: id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["News"], // 🔑 UI auto refresh হবে
    }),

    // Delete news
    deleteNews: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: ["News"], // 🔑 UI auto refresh হবে
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
