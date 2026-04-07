//auth.routes.js

router.post("/login", authController.login)
router.post("/register", authController.register)
router.post("/logout", authController.logout)