import { User } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: customFetchBase,
  endpoints: ({ query, mutation }) => ({
    withdraw: mutation<
      { isSuccess: boolean },
      { amount: number; wallet: string }
    >({
      query(body) {
        return {
          url: "withdraw",
          method: "POST",
          body,
        };
      },
    }),

    setBalance: mutation<User, { [key: string]: number }>({
      query(body) {
        return {
          url: "balance",
          method: "PUT",
          body,
        };
      },
    }),

    getSettings: query<{ key: string; value: string }[], null>({
      query() {
        return {
          url: "settings",
          method: "GET",
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
