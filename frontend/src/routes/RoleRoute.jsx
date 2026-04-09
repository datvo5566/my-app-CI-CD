// RoleRoute.jsx

import { Navigate } from "react-router-dom"
import { useAuth } from "../hook/useAuth"

export default function RoleRoute({ children, role }) {

    const { user, loading } = useAuth()

    if (loading) return <p>Loading...</p>

    if (!user) {
        return <Navigate to="/login" />
    }

    if (user.role !== role) {
        return <Navigate to="/" />
    }

    return children
}