async function waitForDB(prisma, retries = 10) {
    for (let i = 0; i < retries; i++) {
        try {
            await prisma.$connect()
            console.log("✅ DB ready")
            return
        } catch (err) {
            console.log("⏳ Đợi SQL Server...")
            await new Promise(res => setTimeout(res, 3000))
        }
    }

    throw new Error("❌ DB không ready sau nhiều lần thử")
}

module.exports = waitForDB