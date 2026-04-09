// AuthContext.jsx

import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import {
    getAccessToken,
    getRefreshToken,
    saveTokens,
    clearTokens
} from "../utils/tokenStorage"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // 🔥 Load user khi reload app
    useEffect(() => {
        const initAuth = () => {
            const token = getAccessToken()

            if (token) {
                try {
                    const decoded = jwtDecode(token)

                    setUser({
                        id: decoded.id,
                        email: decoded.email,
                        role: decoded.role
                    })
                } catch (err) {
                    console.error("Invalid token")
                    clearTokens()
                    setUser(null)
                }
            }

            setLoading(false)
        }

        initAuth()
    }, [])

    // 🔐 login
    const login = ({ accessToken, refreshToken }) => {
        saveTokens(accessToken, refreshToken)

        const decoded = jwtDecode(accessToken)

        const userData = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        }
        setUser(userData)
        return userData
    }
    // 🔓 logout
    const logout = () => {
        clearTokens()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}