const mysql = require("mysql2/promise");
const logger = require("../utils/logger");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connectWithRetry() {
    while (true) {
        try {
            const conn = await pool.getConnection();
            logger.success("MySQL connected");
            conn.release();
            break;
        } catch (err) {
            logger.warn("MySQL in process to connected");
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

module.exports = {
    query: pool.query.bind(pool),  // Добавляем метод query
    getConnection: pool.getConnection.bind(pool),
    pool,
    connectWithRetry
};