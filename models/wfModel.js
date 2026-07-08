const db = require("../db/connect.js");

exports.allWorkspaces = async(id_user) => {
    const sql = `
      SELECT
    w.id,
    w.name,
    w.created_at,
    w.updated_at,
    COUNT(t.id) AS task_count
FROM workspaces w
LEFT JOIN tasks t ON t.id_ws = w.id
WHERE w.id_user = ?
GROUP BY w.id
ORDER BY w.created_at DESC;
    `;

    const [result] = await db.query(sql, [id_user]);

    return result;
};

exports.createWf = async(ws) => {
const sql = `
    INSERT INTO workspaces (name, description, id_user) VALUES
    (?, ?, ?)
`;

const[result] = await db.query(sql,[
    ws.name,
    ws.description,
    ws.id_user
]);

return result;

};