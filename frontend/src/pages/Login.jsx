import { useState } from "react"
import { login } from "../service/authService"
import { useAuth } from "../hook/useAuth"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login: setUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await login({ email, password })
        setUser(data)

        navigate("/");
    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow w-96"
            >

                <h2 className="text-2xl mb-6 text-center">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-blue-500 text-white p-2"
                >
                    Login
                </button>

            </form>

        </div>
    )
}