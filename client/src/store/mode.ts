import { createSlice } from "@reduxjs/toolkit";

type urlProps = {
  isLightMode: boolean;
};

const initialState: urlProps = {
  isLightMode: false,
};

export const setsSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setLightMode: (state, action) => {
      state.isLightMode = action.payload;
    },
  },
});
export const { setLightMode } = setsSlice.actions;
export default setsSlice.reducer;
