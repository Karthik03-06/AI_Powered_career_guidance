import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userDataSlice';
import questionReducer from "./questionSlice";

const appStore = configureStore({
    reducer:{
        userData:userDataReducer,
        questions: questionReducer,
    }
})
export default appStore;