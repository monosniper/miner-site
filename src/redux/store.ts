import { AppDispatch, RootState } from "@/types";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import userReducer from "./slices/userSlice";
import coinsReducer from "./slices/coinsSlice";
import minerReducer from "./slices/minerSlice";
import { walletApi } from "./api/walletApi";
import { optionsApi } from "./api/optionsApi";
import { authApi } from "./api/authApi";

export const rootReducer = combineReducers({
  user: userReducer,
  coins: coinsReducer,
  miner: minerReducer,

  [walletApi.reducerPath]: walletApi.reducer,
  [optionsApi.reducerPath]: optionsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      walletApi.middleware,
      optionsApi.middleware,
      authApi.middleware,
    ]),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
