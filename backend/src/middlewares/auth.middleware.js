const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {

    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const token = header.split(" ")[1]

    try {

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )

        req.user = decoded

        next()

    } catch {

        res.status(401).json({
            message: "Invalid token"
        })

    }
}

module.exports = authMiddleware