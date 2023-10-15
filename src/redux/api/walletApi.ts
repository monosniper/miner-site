import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ mutation }) => ({
    withdraw: mutation<null, { amount: number; wallet: number }>({
      query() {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "withdraw",
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useWithdrawMutation } = walletApi;
