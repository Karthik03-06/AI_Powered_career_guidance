import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        questions: [],
    },
    reducers: { 
        addTrends: (state, action) => {
            state.questions.push(action.payload);
        }
    }
});

export const { addTrends } = userDataSlice.actions;
export default userDataSlice.reducer;
