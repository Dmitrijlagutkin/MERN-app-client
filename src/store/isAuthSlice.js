import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { setUser } from "./userSlice"
import { login, registration, logout } from "../services/authService"
import { setData } from "./dataSlice"
import { setIsActivated } from "./IsEmailActivatedSlice"
import { API_URL } from "../http"

export const loginApi = createAsyncThunk(
    "isAuth/login",
    async (payload, { dispatch }) => {
        try {
            const { email, password } = payload
            const response = await login(email, password)
            localStorage.setItem("token", response.data.accessToken)
            dispatch(setUser(response.data))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const registrationApi = createAsyncThunk(
    "isAuth/registration",
    async (payload, { dispatch }) => {
        try {
            const { email, password } = payload
            const response = await registration(email, password)
            localStorage.setItem("token", response.data.accessToken)
            dispatch(setUser(response.data))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const logoutApi = createAsyncThunk(
    "isAuth/logout",
    async (payload, { dispatch }) => {
        try {
            const response = await logout()
            localStorage.removeItem("token")
            console.log("logout", response)
            dispatch(setUser(null))
            dispatch(setData(null))
            dispatch(setIsActivated(null))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    "isAuth/checkAuth",
    async (payload, { dispatch }) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
            })
            localStorage.setItem("token", response.data.accessToken)
            dispatch(setUser(response.data))
            console.log("res", response)
            dispatch(setIsAuth(true))
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            dispatch(setIsAuth(false))
        }
    }
)

const isAuthSlice = createSlice({
    name: "isAuth",
    initialState: { isLoading: false, isAuth: false },
    reducers: {
        setIsLoading(state) {
            state.isLoading = false
        },
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
    },
    extraReducers: {
        [loginApi.pending]: (state, action) => {
            state.isLoading = true
        },
        [loginApi.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isAuth = true
        },
        [registrationApi.pending]: (state, action) => {
            state.isLoading = true
        },
        [registrationApi.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isAuth = true
        },
        [logoutApi.pending]: (state, action) => {
            state.isLoading = true
        },
        [logoutApi.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isAuth = false
        },
        [checkAuth.pending]: (state, action) => {
            state.isLoading = true
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.isLoading = false
            // state.isAuth = true
        },
    },
})

export const { setIsAuth, setIsLoading } = isAuthSlice.actions

export default isAuthSlice.reducer
