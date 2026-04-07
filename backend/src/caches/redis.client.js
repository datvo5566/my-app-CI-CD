

const { createClient } = require("redis");

const client = createClient({
    url: "redis://redis:6379",
});

client.on("error", (err) => console.log("Redis Error", err));

const connectRedis = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log("Connected to Redis");
    }
};

module.exports = { client, connectRedis };