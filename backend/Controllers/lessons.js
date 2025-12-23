const { pool } = require("../models/db")
const createlessons = (req, res) => {
    const { title, video, course } = req.body;
    pool
        .query(
            `INSERT INTO lessons (title , video , course)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [title, video, course]
        )
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Lesson created successfully",
                result: result.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
            });
        });
}
const getAlllessons = (req, res) => {
    pool
        .query(
            `SELECT * FROM lessons`
        )
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "All lessons",
                articles: result.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
            });
        });
}
const getlessonsById = (req, res) => {
    const { id } = req.params
    pool.query(`SELECT * FROM lessons WHERE id`,[id])
        .then((result) => {
            res.status(200).json({
                success: true,
                message: `get lessons By Id: ${id} successfully`,
                articles: result.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
            });
        });
}
const deletelessonsById = (req, res) => {
    const { id } = req.params
    pool.query(`DELETE FROM lessons WHERE id=$1 `,[id])
        .then((result) => {
            res.status(200).json({
                success: true,
                message: `Delete lessons By Id: ${id} successfully`,
                articles: result.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
            });
        });
}
const updatelessonsById = (req, res) => {
    const { id } = req.params;
    const { title, video, course } = req.body;
    pool
        .query("SELECT * FROM lessons WHERE id = $1 AND is_deleted = 0", [id])
        .then((result) => {
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `lessons with id: ${id} not found or deleted`,
                });
            }
            const lesson = result.rows[0];
            const newTitle = title || lesson.title;
            const newVideo = video || lesson.video;
            const newCourse = course || lesson.course
            return pool
                .query(
                    "UPDATE lessons SET title = $1, video = $2, course=$3 WHERE id = $4 RETURNING *",
                    [newTitle, newVideo, newCourse, id]
                )
                .then((updateResult) => {
                    res.status(200).json({
                        success: true,
                        message: `lessons with id: ${id} updated successfully`,
                        lessons: updateResult.rows,
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
            });
        });
}
module.exports = {
    createlessons, getAlllessons, getlessonsById, deletelessonsById, updatelessonsById
}