//axios.js
import axios from "axios"
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "../utils/tokenStorage"
const API_URL = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({
    baseURL: API_URL
})
/* REQUEST INTERCEPTOR */

axiosClient.interceptors.request.use((config) => {

    const token = getAccessToken()
    console.log("D1")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log("config = ", config)
    return config
})


/* RESPONSE INTERCEPTOR */

axiosClient.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true

            try {
                console.log("B1");
                const refreshToken = getRefreshToken()
                console.log("B2");
                const res = await axios.post(
                    `${API_URL}/auth/refresh`,
                    { refreshToken }
                )
                console.log("B3");
                const { accessToken } = res.data

                saveTokens(accessToken, refreshToken)

                // originalRequest.headers.Authorization = `Bearer ${accessToken}`
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${accessToken}`
                }
                return axiosClient(originalRequest)

            } catch (err) {

                clearTokens()

                window.location.href = "/login"

            }

        }

        return Promise.reject(error)

    }
)

export default axiosClient