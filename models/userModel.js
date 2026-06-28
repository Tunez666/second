const db = require("../db/connect.js");

exports.registration = async(user) => {
const sql = `
    INSERT INTO users (name, email, password) VALUES
    (?,?,?)
`;

const[result] = await db.query(sql,[
    user.name,
    user.email,
    user.password
]);

return result;

};