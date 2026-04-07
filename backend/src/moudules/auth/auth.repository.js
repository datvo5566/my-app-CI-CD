
//auth.repository.js

const prisma = require("../config/prisma")

async function findUserByEmail(email) {
    console.log(prisma);
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

module.exports = {
    findUserByEmail,
    createUser,
    saveRefreshToken
}