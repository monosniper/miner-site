import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const optionsApi = createApi({
  reducerPath: "optionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ mutation }) => ({
    putOptions: mutation<
      User,
      { network: string; wallet: string; transactionId: string }
    >({
      query() {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "options",
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { usePutOptionsMutation } = optionsApi;
