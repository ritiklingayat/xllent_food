import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  messages: [],
};

const aiSlice = createSlice({
  name: "aiAssistant",

  initialState,

  reducers: {
    openAI: (state) => {
      state.isOpen = true;
    },

    closeAI: (state) => {
      state.isOpen = false;
    },

    toggleAI: (state) => {
      state.isOpen = !state.isOpen;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const {
  openAI,
  closeAI,
  toggleAI,
  addMessage,
} = aiSlice.actions;


export default aiSlice.reducer;