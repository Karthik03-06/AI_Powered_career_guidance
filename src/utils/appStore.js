import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userDataSlice';

const appStore = configureStore({
    reducer:{
        userData:userDataReducer,
    }
})
export default appStore;