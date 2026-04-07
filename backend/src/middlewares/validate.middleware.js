const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data = req[source];
        const { error, value } = schema.validate(data, {
            abortEarly: false // get all error
        })
        if (error) {
            return res.status(400).json({
                message: "validation error",
                errors: error.details.map(err => err.message)
            })
        }
        req[source] = value;
        next();
    }
}
module.exports = validate;