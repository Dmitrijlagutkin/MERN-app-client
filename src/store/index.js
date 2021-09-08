import { configureStore } from "@reduxjs/toolkit"
import setIsAuthReducer from "./isAuthSlice"
import userDataSlice from "./userDataSlice"

export default configureStore({
    reducer: {
        isAuth: setIsAuthReducer,
        user: userDataSlice,
    },
})
