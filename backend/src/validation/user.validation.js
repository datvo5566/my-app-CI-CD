const Joi = require("joi")
const { search } = require("../server")
const getUsersSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().allow("").optional
});

const userIdSchema = Joi.object({
    id: Joi.number().integer().required()
})
const createUserSchema = Joi.object({
    id: Joi.string().min(1).max(100).required()
})


const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(100).required()
})
const deleteUserSchema = Joi.object({
    id: Joi.number().integer().required()
})


module.exports = {
    getUsersSchema,
    createUserSchema,
    updateUserSchema,
    userIdSchema,
    deleteUserSchema
}