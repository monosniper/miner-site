import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

export interface ErrorResponse {
  data: { message: string };
  status: number;
}

const baseUrl = import.meta.env.VITE_API;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");

    const token: {
      accessToken: string;
      refreshToken: string;
    } = JSON.parse(localStorage.getItem("tokens") || "{}").accessToken;

    const finishToken = accessToken ? accessToken : token;

    if (finishToken) headers.set("Authorization", `Bearer ${finishToken}`);
    return headers;
  },
});
const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    try {
      const refresh_token = JSON.parse(
        localStorage.getItem("tokens") || "{}",
      ).refreshToken;
      const refreshResult = await baseQuery(
        {
          url: "/refresh",
          body: { refreshToken: refresh_token },
          method: "POST",
        },
        api,
        extraOptions,
      );
      if (refreshResult.data) {
        const { accessToken, refreshToken } = refreshResult.data as any;
        localStorage.setItem(
          "tokens",
          JSON.stringify({
            accessToken,
            refreshToken,
          }),
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("tokens");
        window.location.href = import.meta.env.VITE_LANDING_URL;
      }
    } finally {
      console.log();
    }
  }

  return result;
};

export default customFetchBase;
