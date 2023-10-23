import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/types";

const initialState: {
  isDisconnected: boolean;
} = {
  isDisconnected: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDisconnected: (state, action: PayloadAction<boolean>) => {
      state.isDisconnected = action.payload;
    },
  },
});

export default mainSlice.reducer;

export const { setDisconnected } = mainSlice.actions;

export const main = (state: RootState) => state.main;
