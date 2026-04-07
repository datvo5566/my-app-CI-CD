// utils/retryPolicy.js
const RETRYABLE_ERRORS = ["ECONNREFUSED", "ETIMEDOUT"];

const shouldRetry = (error) => {
    return (
        !error.isBusinessError &&
        (
            RETRYABLE_ERRORS.includes(error.code) ||
            error.name === "TimeoutError"
        )
    );
};

module.exports = { shouldRetry };