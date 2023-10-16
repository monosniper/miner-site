import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ query }) => ({
    refresh: query<{ accessToken: string }, { refreshToken: string }>({
      query() {
        return {
          url: "refresh",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useRefreshQuery } = authApi;
