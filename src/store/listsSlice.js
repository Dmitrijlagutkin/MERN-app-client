import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { addList } from "../services/listService"
import { getUserData } from "./dataSlice"
import { setIsLoading } from "./isAuthSlice"
import { setIsActivated } from "./IsEmailActivatedSlice"

// export const addList = createAsyncThunk(
//     "lists/addList",
//     async (id, { dispatch }) => {
//         try {
//             const response = await getData(id)
//             dispatch(setIsActivated(response.data.isActivated))
//             return response.data
//         } catch (e) {
//             console.log(e)
//         }
//     }
// )

export const addNewList = createAsyncThunk(
    "lists/addList",
    async (payload, { dispatch }) => {
        console.log("in slice", payload.listTitle, payload.date, payload.category, payload.userId)
        try {
            const {listTitle, date, category, userId}= payload
            const response = await addList(listTitle, date, category)
            console.log(response.data)
            dispatch(getUserData(userId))
            return response.data
        } catch (e) {
            // dispatch(setErrorMessage(e.response?.data?.message))
            // dispatch(setIsAuth(false))
            console.log(e.response?.data?.message)
        }
    }
)

const listsSlice = createSlice({
    name: "lists",
    initialState: {
        lists: null
    },
    reducers: {
        setLists(state, action) {
            state.lists = action.payload
        }
    },
    extraReducers: {
        // [loginApi.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [loginApi.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     // state.isAuth = true
        // },
        // [registrationApi.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [registrationApi.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     state.isAuth = true
        // },
        // [logoutApi.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [logoutApi.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     state.isAuth = false
        // },
        // [checkAuth.pending]: (state, action) => {
        //     state.isLoading = true
        // },
        // [checkAuth.fulfilled]: (state, action) => {
        //     state.isLoading = false
        //     // state.isAuth = true
        // },
    },
})

export const { setLists } = listsSlice.actions

export default listsSlice.reducer
