import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUserData } from "../services/userDataService"

export const fetchData = createAsyncThunk(
    "userData/fetchUserData",
    fetchUserData()
)

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload
        },
    },
})
export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
