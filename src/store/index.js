import { configureStore } from "@reduxjs/toolkit"
import setIsAuthReducer from "./isAuthSlice"
import userSlice from "./userSlice"
import dataSlice from "./dataSlice"
import isEmailActivatedSlice from "./IsEmailActivatedSlice"

export default configureStore({
    reducer: {
        isAuth: setIsAuthReducer,
        user: userSlice,
        data: dataSlice,
        isEmailActivated: isEmailActivatedSlice,
    },
})
