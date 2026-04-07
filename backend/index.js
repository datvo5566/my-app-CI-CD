const app = require("./src/server");
// const { connectRedis } = require("./src/caches/redis.client");
const prisma = require("./src/config/prisma");
const waitForDB = require("./src/utils/waitForDB");

const startServer = async () => {
    try {
        // await connectRedis();

        // 💥 cố tình crash
        // throw new Error("Crash test Case 3");
        // 🔥 thêm dòng này
        await waitForDB(prisma);

        app.listen(5000, () => {
            console.log("🚀 Server running on port 5000");
        });

    } catch (err) {
        console.error("❌ Server failed to start:", err.message);
        process.exit(1);
    }
};
startServer();