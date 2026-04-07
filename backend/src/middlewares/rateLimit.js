const rateLimit = require('express-rate-limit');

const Limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: { error: 'Too many requests, please try again later.' },
})

module.exports = Limiter;