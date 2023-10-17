import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RefreshRes {
  accessToken: string;
  refreshToken: string;

  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ query, mutation }) => ({
    refresh: mutation<RefreshRes, { refreshToken: string }>({
      query(body) {
        return {
          url: "refresh",
          method: "POST",
          body,
        };
      },
    }),

    getMe: query<User, null>({
      query() {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useRefreshMutation, useGetMeQuery } = authApi;
