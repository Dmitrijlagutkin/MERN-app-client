import { useState } from "react"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onChangeEmailHandler = (e) => setEmail(e.target.value)
    const onChangePasswordHandler = (e) => setPassword(e.target.value)

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
            <button>Login</button>
            <button>Registration</button>
        </div>
    )
}

export default LoginForm
