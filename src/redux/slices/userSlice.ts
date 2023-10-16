import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, User } from "@/types";

const initialState: {
  isAuth: boolean;
  userData?: User;
  sumCoins?: { [key: string]: number };
} = {
  isAuth: JSON.parse(localStorage.getItem("tokens") || "false") || false,
  userData: undefined,
  sumCoins: undefined,
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
  },
});

export default userSlice.reducer;

export const { setAuth, setUserData, setSumCoins } = userSlice.actions;

export const user = (state: RootState) => state.user;
