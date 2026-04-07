// const sql = require("mssql");

// const config = {
//     user: "sa",
//     password: "103395Dat",
//     server: "sqlserver",
//     port: 1433,
//     database: "db2026",
//     options: {
//         trustServerCertificate: true
//     }
// };

// const connectWithRetry = async () => {
//     while (true) {
//         try {
//             const pool = await new sql.ConnectionPool(config).connect();
//             console.log("✅ Connected to SQL Server");
//             return pool;
//         } catch (err) {
//             console.log("⏳ SQL chưa sẵn sàng, retry sau 3s...");
//             await new Promise(res => setTimeout(res, 3000));
//         }
//     }
// };

// const poolPromise = connectWithRetry();

// module.exports = {
//     sql,
//     poolPromise
// };