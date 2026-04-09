//axios.js
import axios from "axios"
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "../utils/tokenStorage"
const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", API_URL)
const axiosClient = axios.create({
    baseURL: API_URL
})

/* REQUEST INTERCEPTOR */

axiosClient.interceptors.request.use((config) => {

    const token = getAccessToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

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

                const refreshToken = getRefreshToken()

                const res = await axios.post(
                    `${API_URL}/auth/refresh`,
                    { refreshToken }
                )

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