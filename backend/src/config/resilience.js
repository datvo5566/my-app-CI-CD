// config/resilience.js
module.exports = {
    DB_TIMEOUT: Number(process.env.DB_TIMEOUT) || 2000,
    RETRY_COUNT: Number(process.env.RETRY_COUNT) || 3,
    RETRY_DELAY: Number(process.env.RETRY_DELAY) || 500,
};