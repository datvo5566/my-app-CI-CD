const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const validate = require("../middlewares/validate.middleware")
const { getUsersSchema, userIdSchema, createUserSchema, updateUserSchema, deleteUserSchema } = require("../validation/user.validation");
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/users",
    authMiddleware,
    validate(getUsersSchema, "query"),
    asyncHandler(controller.getUsers));
router.get("/users/:id",
    validate(userIdSchema, "params"),
    asyncHandler(controller.getUserById));
router.post("/users",
    validate(createUserSchema),
    asyncHandler(controller.createUser));
router.put("/users/:id",
    validate(updateUserSchema),
    asyncHandler(controller.updateUser));
router.delete("/users/:id",
    validate(deleteUserSchema),
    asyncHandler(controller.deleteUser));

module.exports = router;