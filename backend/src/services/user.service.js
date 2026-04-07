const { poolPromise, sql } = require("../config/db");
const { getCache, setCache, clearUserCache } = require("../caches/cache.util");
const { search } = require("../routes/user.route");
// GET ALL
const getAllUsers = async ({ page, limit, search = "" }) => {
    const offset = (page - 1) * limit;
    const key = `users: page=${page}:limit=${limit}:search=${search}`; // pagination then
    // 1. check cache
    const cache = await getCache(key);
    if (cache) {
        console.log("✅ CACHE HIT: users");
        return cache;
    }
    console.log("❌ CACHE MISS: users");
    // 2. Call db
    const pool = await poolPromise;
    const result = await pool.request()
        .input("search", sql.NVarChar, `%${search}%`)
        .input("offset", sql.Int, offset)
        .input("limit", sql.Int, limit)
        .query(`SELECT * FROM Users
            WHERE name like @search
            ORDER BY id
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY
            `);
    // 3 Total count
    const countResult = await pool.request()
        .input("search", sql.NVarChar, `%${search}%`)
        .query(`
                SELECT COUNT(*) as total
                FROM Users
                WHERE name LIKE @search
            `);
    const data = {
        data: result.recordset,
        pagination: {
            page,
            limit,
            total: countResult.recordset[0].total,
        }
    };
    // 4. set cache
    await setCache(key, data, 60);
    return data;
};
// GET BY ID
const getUserById = async (id) => {
    const key = `user:${id}`;

    const cache = await getCache(key);
    if (cache) {
        console.log(`✅ CACHE HIT: user ${id}`);
        return cache;
    }

    console.log(`❌ CACHE MISS: user ${id}`);

    const pool = await poolPromise;
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM Users WHERE id = @id");

    const user = result.recordset[0];

    if (user) {
        await setCache(key, user, 60);
    }

    return user;
};

// CREATE
const createUser = async (name) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input("name", sql.NVarChar, name)
        .query(`
            INSERT INTO Users (name)
            OUTPUT INSERTED.*
            VALUES (@name)
        `);

    const user = result.recordset[0];

    // ❗ quan trọng: clear cache
    await clearUserCache();

    return user;
};

// UPDATE
const updateUser = async (id, name) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input("id", sql.Int, id)
        .input("name", sql.NVarChar, name)
        .query(`
            UPDATE Users
            SET name = @name
            OUTPUT INSERTED.*
            WHERE id = @id
        `);

    const user = result.recordset[0];

    await clearUserCache(id);

    return user;
};

// DELETE
const deleteUser = async (id) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input("id", sql.Int, id)
        .query(`
            DELETE FROM Users
            OUTPUT DELETED.*
            WHERE id = @id
        `);

    const user = result.recordset[0];

    await clearUserCache(id);

    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};