class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.isBusinessError = true;
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;