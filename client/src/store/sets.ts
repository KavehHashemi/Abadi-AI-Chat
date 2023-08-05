import { createSlice } from "@reduxjs/toolkit";
type urlProps = {
  currentSet: {
    name: string | null;
    id: string | null;
  };
};

const initialState: urlProps = {
  currentSet: { id: null, name: null },
};

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    setCurrentSet: (state, action) => {
      state.currentSet.id = action.payload.id;
      state.currentSet.name = action.payload.name;
    },
  },
});
export const { setCurrentSet } = setsSlice.actions;
export default setsSlice.reducer;
