import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RefreshRes extends User {
  accessToken: string;
  refreshToken: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ mutation }) => ({
    refresh: mutation<RefreshRes, { refreshToken: string }>({
      query(body) {
        return {
          url: "refresh",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useRefreshMutation } = authApi;
