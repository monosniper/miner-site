import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  selectedCoins: string[];
  coins: {
    date: string;
    usd: number;
    name: string;
    fullName: string;
  }[];
} = {
  selectedCoins: [],
  coins: [],
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setSelectedCoins: (state, action: PayloadAction<string[]>) => {
      state.selectedCoins = action.payload;
    },

    setCoins: (
      state,
      action: PayloadAction<
        {
          date: string;
          usd: number;
          name: string;
          fullName: string;
        }[]
      >,
    ) => {
      state.coins = action.payload;
    },
  },
});

export default coinsSlice.reducer;

export const { setSelectedCoins, setCoins } = coinsSlice.actions;

export const coins = (state: RootState) => state.coins;
