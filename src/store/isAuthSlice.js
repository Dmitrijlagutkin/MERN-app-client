import { createSlice } from "@reduxjs/toolkit"

const isAuthSlice = createSlice({
    name: "isAuth",
    initialState: {
        isAuth: false,
    },
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = true
        },
    },
})
export const { setIsAuth } = isAuthSlice.actions

export default isAuthSlice.reducer
