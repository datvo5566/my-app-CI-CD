// =====================
// 📁 src/utils/cache.util.js
// =====================
const { client } = require("../caches/redis.client");

const getCache = async (key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.log("Cache error:", err.message);
        return null;
    }
};

const setCache = async (key, value, ttl = 60) => {
    await client.set(key, JSON.stringify(value), { EX: ttl });
};

const clearUserCache = async (id) => {

    const keys = await client.keys("users:*");
    if (keys.length > 0) {
        await client.del(keys);
    }
    // clear user details
    if (id) await client.del(`user:${id}`);
};

module.exports = { getCache, setCache, clearUserCache };
