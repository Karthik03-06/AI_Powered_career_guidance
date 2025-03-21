import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        questions: [],
    },
    reducers: { 
        addTrends: (state, action) => {
            state.questions.push(action.payload);
        },
        setQuestions: (state, action) => {
            state.questions = action.payload; // Replace existing questions
        }
    }
});

export const { addTrends, setQuestions } = userDataSlice.actions;
export default userDataSlice.reducer;
