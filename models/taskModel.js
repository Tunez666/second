const db = require("../db/connect.js");

exports.activeTasks = async (id_user) => {

    const sql = `
        SELECT
            t.id,
            t.id_ws,
            t.title,
            t.status,
            t.updated_at

        FROM tasks t

        JOIN workspaces w
            ON w.id = t.id_ws

        WHERE 
            w.id_user = ?
            AND t.status != 'done'

        ORDER BY 
            t.updated_at DESC;
    `;


    const [result] = await db.query(sql, [id_user]);


    return result;

};

exports.tasksFromWs = async (id_workspace) => {
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

exports.createTask = async (taskData) => {

    const sql = `
        INSERT INTO tasks
        (
            id_ws,
            title,
            description,
            start_date,
            due_date,
            all_day
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;


    const values = [
        taskData.id_ws,
        taskData.title,
        taskData.description || null,
        taskData.start_date || null,
        taskData.due_date || null,
        taskData.all_day ? 1 : 0
    ];


    const [result] = await db.query(
        sql,
        values
    );


    return result.insertId;

};

exports.getTaskById = async (taskId, userId) => {


    const sql = `

SELECT 
    t.*

FROM tasks t

JOIN workspaces w
ON w.id = t.id_ws

WHERE t.id = ?
AND w.id_user = ?

`;


    const [result] = await db.query(
        sql,
        [
            taskId,
            userId
        ]
    );


    return result[0];

};

exports.updateTask = async (taskId, data) => {


    const sql = `

UPDATE tasks

SET

title = ?,
description = ?,
status = ?,
start_date = ?,
due_date = ?,
all_day = ?

WHERE id = ?

`;


    await db.query(
        sql,
        [
            data.title,
            data.description,
            data.status,
            data.start_date || null,
            data.due_date || null,
            data.all_day ? 1 : 0,
            taskId
        ]
    );


};