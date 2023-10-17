import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, User } from "@/types";

const initialState: {
  isAuth: boolean;
  userData?: User;
  sumCoins?: { [key: string]: number };
  wallet?: string;
  totalBalance?: number;
} = {
  isAuth: localStorage.getItem("tokens") ? true : false,
  userData: undefined,
  sumCoins: undefined,
  wallet: undefined,
  totalBalance: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },

    setSumCoins: (
      state,
      action: PayloadAction<{ [key: string]: number } | undefined>,
    ) => {
      state.sumCoins = action.payload;
    },

    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },

    setTotalBalance: (state, action: PayloadAction<number>) => {
      state.totalBalance = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setAuth, setUserData, setSumCoins, setWallet, setTotalBalance } =
  userSlice.actions;

export const user = (state: RootState) => state.user;
