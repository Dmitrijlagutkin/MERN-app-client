import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginApi, registrationApi, logoutApi } from "../store/isAuthSlice"
import { getUserData } from "../store/dataSlice"

const LoginForm = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector((state) => state.isAuth)
    const { user } = useSelector((state) => state.user)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onChangeEmailHandler = (e) => setEmail(e.target.value)
    const onChangePasswordHandler = (e) => setPassword(e.target.value)
    const onClickLogin = () => {
        dispatch(loginApi({ email, password }))
    }
    const onClickRegistration = () => {
        dispatch(registrationApi({ email, password }))
    }
    const onClickLogoutHandler = () => {
        dispatch(logoutApi())
    }

    useEffect(() => {
        if (user) {
            dispatch(getUserData(user.user.id))
        }
    }, [user])

    return (
        <div>
            Login form
            <input
                type='text'
                value={email}
                placeholder='email'
                onChange={(e) => onChangeEmailHandler(e)}
            />
            <input
                type='text'
                value={password}
                placeholder='password'
                onChange={(e) => onChangePasswordHandler(e)}
            />
            <button onClick={onClickLogin}>Login</button>
            <button onClick={onClickRegistration}>Registration</button>
            <span onClick={onClickLogoutHandler}>logout</span>
        </div>
    )
}

export default LoginForm
