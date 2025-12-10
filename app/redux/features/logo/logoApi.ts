import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logoApi = createApi({
  reducerPath: "logoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/settings", // <-- adjust if needed
  }),
  tagTypes: ["Logo"],
  endpoints: (builder) => ({
    // GET logos
    getLogos: builder.query({
      query: () => "/logo",
      providesTags: ["Logo"],
    }),

    // POST upload logo
    uploadLogo: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("logo", file);

        return {
          url: "/logo",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Logo"],
    }),

    // DELETE logo
    deleteLogo: builder.mutation({
      query: () => ({
        url: "/logo",
        method: "DELETE",
      }),
      invalidatesTags: ["Logo"],
    }),
  }),
});

export const {
  useGetLogosQuery,
  useUploadLogoMutation,
  useDeleteLogoMutation,
} = logoApi;
