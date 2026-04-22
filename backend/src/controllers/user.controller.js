const userService = require("../services/user.service");
const { getCache, setCache, clearUserCache } = require("../caches/cache.util");
// GET ALL
const getUsers = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        console.log("Search = " + search)
        const users = await userService.getAllUsers({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            search: search || ""
        });
        res.json({ success: true, data: users });
    } catch (err) {
        console.error("🔥 ERROR REAL:", err); // thêm dòng này
        res.status(500).json({ error: err.message });
    }
};
const findbyUser = async (req, res) => {

}
// GET DETAIL
const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (!user || user == "") return res.status(404).json({ error: "Not found" });
        console.log("Đang tìm kiếm id... " + user)
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
// CREATE
const createUser = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim().length < 2) {
            return res.status(400).json({ error: "Invalid name" });
        }

        const newUser = await userService.createUser(name);


        res.status(201).json({ success: true, data: newUser });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// UPDATE
const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const user = await userService.updateUser(id, name);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ success: true, data: deleted });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};