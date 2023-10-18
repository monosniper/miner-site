import { User } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchBase";

export const optionsApi = createApi({
  reducerPath: "optionsApi",
  baseQuery: customFetchBase,
  endpoints: ({ mutation }) => ({
    putOptions: mutation<User, { network: string; mono_ip: boolean }>({
      query(body) {
        return {
          url: "options",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { usePutOptionsMutation } = optionsApi;
