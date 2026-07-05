const db = require("../db/connect.js");

exports.registration = async(user) => {
const sql = `
    INSERT INTO users (username, email, password) VALUES
    (?,?,?)
`;

const[result] = await db.query(sql,[
    user.username,
    user.email,
    user.password
]);

return result;

};

exports.selectUserByEmail = async(email) => {
    const sql = `
        SELECT * FROM users WHERE email = ?
    `;

    const [result] = await db.query(sql, [email]);

    return result[0];
};