const express = require("express")
const router = express.Router()
const limiter = require("../middlewares/rateLimit");

const authController = require("../controllers/auth.controller")

router.post("/login", limiter, authController.login)

router.post("/register", authController.register)
router.post("/logout", authController.logout)
router.post("/refresh", authController.refresh)

module.exports = router


