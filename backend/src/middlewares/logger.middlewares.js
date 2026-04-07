const loggerMiddleware = (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;
    const time = new Date().toISOString();

    console.log(`[${time}] ${method} ${url}`)
    next();
}

module.exports = loggerMiddleware;