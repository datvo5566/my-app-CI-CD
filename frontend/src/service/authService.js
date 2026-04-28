//authService.js

import axiosClient from "../api/axios";
import { getRefreshToken, saveTokens, clearTokens, getAccessToken } from "../utils/tokenStorage";
export async function login(data) {
    console.log("Đang thực hiện bước 1....")
    const res = await axiosClient.post("/login", data)
    console.log("Đang thực hiện bước 2")
    const { accessToken, refreshToken } = res.data.data
    console.log("Đang thực hiện bước 3....")
    saveTokens(accessToken, refreshToken)
    console.log("Đang thực hiện bước 4....")
    console.log("Data= ", res.data.data)
    return res.data
    console.log("Đang trả dữ liệu để kết thúc....")
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

