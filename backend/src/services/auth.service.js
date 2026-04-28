const prisma = require("../config/prisma")
const hash = require("../utils/hash")
const jwtUtil = require("../utils/jwt")
const retry = require('../utils/retry')
const circuitBreaker = require('../utils/circuitBreaker')
const withTimeout = require('../utils/timeout');
const NotFoundError = require('../errors/NotFoundError')
const { shouldRetry } = require('../utils/retryPolicy')
const { DB_TIMEOUT, RETRY_COUNT, RETRY_DELAY } = require('../config/resilience');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');
async function register(data) {

    console.log("Đang vào register service.....");
    console.log("step 1....")
    const existing = await prisma.users.findUnique({
        where: { email: data.email }
    })
    console.log("step 2....")
    if (existing) {
        throw new Error("Email already exists")
    }

    const password = await hash.hashPassword(data.password)
    console.log("step 3....")
    const user = await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password,
            role: "user"
        }
    })
    console.log("result....")
    return { message: "Register success" }


}
//auth.service.js
async function login(data) {
    const requestId = uuidv4();
    const log = logger.child({ requestId });
    log.info(
        { email: data.email },
        "Login request"
    );
    try {
        console.log("typeof fire:", typeof circuitBreaker.fire);
        const user = await retry(
            () =>
                circuitBreaker.fire(() =>
                    withTimeout(
                        prisma.users.findUnique({
                            where: { email: data.email },
                        }), 5
                    DB_TIMEOUT  // timeout 2s
                    )
                    //case 1: DB chết / timeout
                    // {
                    //     throw new Error("DB giả lập bị chết");

                    // }
                    //case 2: Transient error (lúc được lúc không)
                    // {
                    //     if (Math.random() < 0.5) {
                    //         throw new Error("Random fail");
                    //     }
                    //     return prisma.users.findUnique({
                    //         where: { email: data.email }
                    //     })
                    // }
                ),
            {
                retries: RETRY_COUNT,
                delay: RETRY_DELAY,
                shouldRetry,
                // log retry
                onRetry: ({ attempt, delay, error }) => {
                    log.warn(
                        { email: data.email, attempt, delay, error },
                        "Retry login operation"
                    );
                },
            }
        );
        if (!user) {
            throw new NotFoundError("User not found");
        }
        log.info(
            { email: data.email, userId: user.id },
            "Login success"
        )
        const accessToken = jwtUtil.generateAccessToken(user);
        const refreshToken = jwtUtil.generateRefreshToken(user);
        return {
            accessToken,
            refreshToken
        };

    } catch (err) {
        log.error(
            { err, email: data.email },
            "Login failed"
        );
        if (err.message === "Circuit is OPEN") {
            log.warn("🔥 Fallback triggered - circuit open");
            return { fallback: true };
        }
        throw err;
    }
}
// async function login(data) {

//     console.log("👉 Login request:", data.email);

//     await new Promise(r => setTimeout(r, 200));

//     if (Math.random() < 0.3) {
//         console.log("💥 Random crash triggered");
//         throw new Error("Random DB error");
//     }

//     const user = await prisma.users.findUnique({
//         where: { email: data.email }
//     })

//     if (!user) {
//         throw new Error("User not found")
//     }

//     const valid = await hash.comparePassword(
//         data.password,
//         user.password
//     )

//     if (!valid) {
//         throw new Error("Invalid password")
//     }

//     // 🔥 truyền full payload
//     const payload = {
//         userId: user.id,
//         email: user.email,
//         role: user.role
//     }

//     const accessToken = jwtUtil.generateAccessToken(payload)
//     const refreshToken = jwtUtil.generateRefreshToken(payload)

//     await prisma.refreshToken.create({
//         data: {
//             token: refreshToken,
//             userId: user.id
//         }
//     })

//     return {
//         accessToken,
//         refreshToken
//     }
// }
async function logout(refreshToken) {

    await prisma.refreshToken.deleteMany({
        where: { token: refreshToken }
    })

    return { message: "Logout success" }
}

async function refresh(refreshToken) {

    const token = await prisma.refreshToken.findFirst({
        where: { token: refreshToken }
    })

    if (!token) {
        throw new Error("Invalid refresh token")
    }

    const decoded = jwtUtil.verifyRefreshToken(refreshToken)

    const accessToken = jwtUtil.generateAccessToken(decoded.userId)

    return { accessToken }
}

module.exports = {
    login,
    register,
    logout,
    refresh
}