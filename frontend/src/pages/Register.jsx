import { useState } from "react"
import { register } from "../service/authService"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            return setError("Password không khớp")
        }

        try {
            setLoading(true)
            setError("")

            await register({
                name: form.name,
                email: form.email,
                password: form.password
            })

            alert("Đăng ký thành công!")
            navigate("/login")

        } catch (err) {
            setError(err.response?.data?.message || "Register failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    )
}