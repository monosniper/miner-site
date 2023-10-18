import { User } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";

interface RefreshRes {
  accessToken: string;
  refreshToken: string;

  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
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
        return {
          url: "me",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useRefreshMutation, useGetMeQuery } = authApi;
