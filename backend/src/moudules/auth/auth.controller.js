
//auth.controller.js


const authService = require("../auth/auth.service");
async function login(req, res) {
    try {
        const result = await authService.login(req.body)
        res.json(result)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
async function register(req, res) {
    try {
        const result = await authService.register(req.body);
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

async function logout(req, res) {
    try {
        const { refreshToken } = req.body
        const result = await authService.logout(refreshToken)
        res.json(result);
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}









