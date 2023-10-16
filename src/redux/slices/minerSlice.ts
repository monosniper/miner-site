import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Update } from "@/types";

const initialState: {
  atWork: boolean;
  updateData?: Update;
} = {
  atWork: false,
  updateData: undefined,
};

export const minerSlice = createSlice({
  name: "miner",
  initialState,
  reducers: {
    setWork: (state, action: PayloadAction<boolean>) => {
      state.atWork = action.payload;
    },

    setUpdateData: (state, action: PayloadAction<Update | undefined>) => {
      state.updateData = action.payload;
    },
  },
});

export default minerSlice.reducer;

export const { setWork, setUpdateData } = minerSlice.actions;

export const miner = (state: RootState) => state.miner;
