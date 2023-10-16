import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const optionsApi = createApi({
  reducerPath: "optionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/`,
  }),
  endpoints: ({ mutation }) => ({
    putOptions: mutation<User, { network: string }>({
      query(body) {
        const token: {
          accessToken: string;
          refreshToken: string;
        } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

        return {
          url: "options",
          method: "PUT",
          body,

          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { usePutOptionsMutation } = optionsApi;
