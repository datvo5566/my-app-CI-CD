import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../hook/useAuth"

export default function Home() {
    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>

    // 🔥 admin tự động sang dashboard
    if (user?.role === "admin") {
        return <Navigate to="/dashboard" />
    }

    return (
        <div>
            <h1>Home Page</h1>

            <nav>
                {!user && (
                    <>
                        <Link to="/login">Login</Link> |{" "}
                        <Link to="/register">Register</Link>
                    </>
                )}

                {/* 👤 user đã login */}
                {user && user.role === "user" && (
                    <p>Welcome user!</p>
                )}

                {/* 👑 admin mới thấy dashboard */}
                {user?.role === "admin" && (
                    <>
                        {" | "}
                        <Link to="/dashboard">Dashboard</Link>
                    </>
                )}
            </nav>
        </div>
    )
}