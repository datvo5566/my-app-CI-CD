//authService.js

import axiosClient from "../api/axios";
import { getRefreshToken, saveTokens, clearTokens, getAccessToken } from "../utils/tokenStorage";
export async function login(data) {

    const res = await axiosClient.post("/login", data)
    const { accessToken, refreshToken } = res.data
    saveTokens(accessToken, refreshToken)
    return res.data
}

export async function register(data) {
    const res = await axiosClient.post("/register", data)
    return res.data
}
export async function logout() {

    const refreshToken = getRefreshToken()

    await axiosClient.post("/logout", {
        refreshToken
    })

    clearTokens()

}

