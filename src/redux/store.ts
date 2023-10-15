import { AppDispatch, RootState } from "@/types";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import userReducer from "./slices/userSlice";
import coinsReducer from "./slices/coinsSlice";
import { walletApi } from "./api/walletApi";

export const rootReducer = combineReducers({
  user: userReducer,
  coins: coinsReducer,

  [walletApi.reducerPath]: walletApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([walletApi.middleware]),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
