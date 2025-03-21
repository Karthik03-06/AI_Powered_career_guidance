import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
