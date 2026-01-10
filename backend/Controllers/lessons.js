const { pool } = require("../models/db")
const createlessons = (req, res) => {
    const { title, video, course ,image ,duration, is_completed} = req.body;
    pool
        .query(
        `INSERT INTO lessons (title , video , course,image ,duration, is_completed)
        VALUES ($1, $2, $3,$4, $5, $6)
        RETURNING *`,
        [title, video, course,image ,duration, is_completed]
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
                lessons: result.rows,
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
    pool.query(`SELECT * FROM lessons WHERE id=$1`, [id])
        .then((result) => {
            res.status(200).json({
                success: true,
                message: `get lessons By Id: ${id} successfully`,
                lessons: result.rows[0],
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

const getlessonsByCourseId = (req, res) => {
    const { id } = req.params
    pool.query(`SELECT * FROM lessons WHERE course=$1 `, [id])
        .then((result) => {
            res.status(200).json({
                success: true,
                message: `get lessons By Id: ${id} successfully`,
                lessons: result.rows,
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


    pool.query(`DELETE FROM lessons WHERE id=$1 `, [id])
        .then((result) => {
            res.status(200).json({
                success: true,
                message: `Delete lessons Id: ${id} successfully`,
                lessons: result.rows,
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
    const { title, video, course ,image ,duration, is_completed} = req.body;
    pool
        .query("SELECT * FROM lessons WHERE id = $1", [id])
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
            const newCourse = course || lesson.course;
            const newImage= image || lesson.image
            const newDuration= duration || lesson.duration
            const newIs_completed= is_completed || lesson.is_completed
            return pool
                .query(
                    "UPDATE lessons SET title = $1, video = $2, course=$3,  image=$4, duration=$5, is_completed=$6 WHERE id = $7 RETURNING *",
                    [newTitle, newVideo, newCourse, newImage,newDuration, newIs_completed,id]
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


const isCourseCompleted = (req, res) => {
  const { courseId } = req.params;

  pool
    .query(
      `SELECT COUNT(*) AS remaining
       FROM lessons
       WHERE course=$1 AND is_completed=false`,
      [courseId]
    )
    .then(result => {
      const allCompleted = Number(result.rows[0].remaining) === 0;

      res.status(200).json({
        success: true,
        allCompleted, 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getCertificate = (req, res) => {
  const { courseId } = req.params;

  pool
    .query(
      `SELECT COUNT(*) AS remaining
       FROM lessons
       WHERE course=$1 AND is_completed=false`,
      [courseId]
    )
    .then(async result => {
      if (Number(result.rows[0].remaining) !== 0) {
        return res.status(403).json({
          success: false,
          message: "Course is not fully completed yet",
        });
      }

      const data = await pool.query(
        `SELECT title AS courseName FROM courses WHERE id=$1`,
        [courseId]
      );

      res.status(200).json({
        success: true,
        certificate: data.rows[0], 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};


module.exports = {
    createlessons, getAlllessons, getlessonsById, deletelessonsById, updatelessonsById,getlessonsByCourseId,isCourseCompleted,getCertificate
}
