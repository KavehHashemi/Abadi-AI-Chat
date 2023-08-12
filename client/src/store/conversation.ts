import { createSlice } from "@reduxjs/toolkit";

type ConversationState = {
  currentConversation: string | null;
};

const initialState: ConversationState = {
  currentConversation: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
  },
});
export const { setCurrentConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
