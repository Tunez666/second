const db = require("../db/connect.js");

exports.lastTasks = async(id_user) => {
    const sql = `
SELECT
    t.id,
    t.id_ws,
    t.title,
    t.status,
    t.created_at
FROM tasks t
JOIN workspaces w
    ON w.id = t.id_ws
JOIN (
    SELECT
        id_ws,
        MAX(created_at) AS last_created
    FROM tasks
    GROUP BY id_ws
) last_task
    ON last_task.id_ws = t.id_ws
   AND last_task.last_created = t.created_at
WHERE w.id_user = ?;
    `;

    const [result] = await db.query(sql, [id_user]);

    return result;
};

exports.tasksFromWs = async(id_workspace) => {
    const sql = `
SELECT
    t.id,
    t.id_ws,
    t.title,
    t.status,
    t.created_at
FROM tasks t
JOIN workspaces w
    ON w.id = t.id_ws
WHERE w.id = ?;
    `;

    const [result] = await db.query(sql, [id_workspace]);

    return result;
};