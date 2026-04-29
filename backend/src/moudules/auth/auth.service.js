//auth.service.js

const prisma = require("../config/prisma")
const bcrypt = require("../../utils/hash");
const jwtUtil = require("../../utils/jwt");
const repo = require("../../moudules/auth/auth.repository");
async function findUserByEmail(email) {
    console.log("Giá trị là : " + Object.keys(prisma))
    return prisma.users.findUnique({
        where: { email }
    })
}

async function createUser(data) {
    return prisma.users.create({
        data
    })
}

async function saveRefreshToken(token, userId) {
    return prisma.refreshToken.create({
        data: {
            token,
            userId
        }
    })
}
async function login(data) {

    const user = await repo.findUserByEmail(data.email)

    if (!user) {
        throw new Error("User not found")
    }

    const valid = await bcrypt.comparePassword(
        data.password,
        user.password
    )

    if (!valid) {
        throw new Error("Invalid password")
    }

    const accessToken = jwtUtil.generateAccessToken(user.id)
    const refreshToken = jwtUtil.generateRefreshToken(user.id)

    await repo.saveRefreshToken(refreshToken, user.id)

    return {
        accessToken,
        refreshToken
    }
}
async function register(data) {
    const existing = await findUserByEmail(data.email);
    if (existing) {
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hashPassword(data.password, 10)
    const user = await createUser({
        email: data.email,
        password: hashedPassword
    })
    console.log("User currently =  ", user);
    return {
        message: "Register successful",
        UserId: user.id

    }
}

async function logout(refreshToken) {
    await prisma.refreshToken.deleteMany({
        where: {
            token: refreshToken
        }
    })
    return {
        message: "Logout successful"
    }
}
module.exports = {
    findUserByEmail,
    createUser,
    saveRefreshToken,
    login,
    register,
    logout
}