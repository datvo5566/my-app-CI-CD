
//jwt.js
const jwt = require("jsonwebtoken")
console.log("ACCESS:", process.env.ACCESS_TOKEN_SECRET)
console.log("REFRESH:", process.env.REFRESH_TOKEN_SECRET)
console.log("DATABASE_URL:", process.env.DATABASE_URL)

function generateAccessToken(payload) {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )
}

function generateRefreshToken(payload) {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    )
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}