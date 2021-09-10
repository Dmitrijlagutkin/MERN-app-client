import { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import LoginForm from "./components/LoginForm"
import { checkAuth } from "./store/isAuthSlice"
import AuthPage from "./pages/AuthPage"
import ListsPage from "./pages/ListsPage"
import SwipeableTemporaryDrawer from "./components/Navbar"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(checkAuth())
        }
    }, [])
    const { isAuth } = useSelector((state) => state.isAuth)
    const { isLoading } = useSelector((state) => state.isAuth)
    const { isActivated } = useSelector((state) => state.isEmailActivated)
    console.log("isActivated", isActivated)
    return (
        <BrowserRouter>
            <SwipeableTemporaryDrawer />
            {/* {isLoading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    {!isActivated && <h2>Подтвердите почту</h2>}
                    <h1>
                        {isAuth ? "Пользователь авторизован" : "не авторизован"}
                    </h1>
                    <LoginForm />
                </div>
            )} */}
            Work
            <Route path='/auth'>
                <AuthPage />
            </Route>
            <Route path='/lists'>
                <ListsPage />
            </Route>
        </BrowserRouter>
    )
}

export default App
