import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  selectedCoins: string[];
} = {
  selectedCoins: [],
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setSelectedCoins: (state, action: PayloadAction<string[]>) => {
      state.selectedCoins = action.payload;
    },
  },
});

export default coinsSlice.reducer;

export const { setSelectedCoins } = coinsSlice.actions;

export const coins = (state: RootState) => state.coins;
