export const saveTokens = (accessToken, refreshToken) => {
    if (!accessToken || typeof accessToken !== "string") {
        console.error("❌ accessToken invalid:", accessToken)
        return
    }

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken")
}


export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken")
}

export const clearTokens = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}