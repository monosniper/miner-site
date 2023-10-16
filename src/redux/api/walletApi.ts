import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ query, mutation }) => ({
    withdraw: mutation<
      { isSuccess: boolean },
      { amount: number; wallet: number }
    >({
      query(body) {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "withdraw",
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    setBalance: mutation<User, { [key: string]: number }>({
      query(body) {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "balance",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        };
      },
    }),

    getSettings: query<{ key: string; value: string }[], null>({
      query() {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "settings",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useWithdrawMutation,
  useSetBalanceMutation,
  useGetSettingsQuery,
} = walletApi;
