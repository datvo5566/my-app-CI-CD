//auth.controller.js
const authService = require("../services/auth.service")

async function login(req, res, next) {
    try {
        console.log("Đang vào login.... ")
        const user = await authService.login(req.body)
        return res.json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err)
        console.error("Controller error:", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function register(req, res, next) {
    try {
        console.log("Đang vào register.... ")
        const result = await authService.register(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}
async function logout(req, res, next) {
    try {
        const result = await authService.logout(req.body.refreshToken)
        res.json(result)
    } catch (err) {
        next(err)
    }
}
async function refresh(req, res, next) {
    try {
        const result = await authService.refresh(req.body.refreshToken)
        res.json(result)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    login, register, logout, refresh
}
