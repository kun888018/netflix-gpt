import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userAuth/userSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
    }
});

export default appStore;