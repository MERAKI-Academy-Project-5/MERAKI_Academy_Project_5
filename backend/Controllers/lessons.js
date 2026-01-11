const { pool } = require("../models/db");
const createlessons = (req, res) => {
  const { title, video, course, image, duration, is_completed } = req.body;
  pool
    .query(
      `INSERT INTO lessons (title , video , course,image ,duration, is_completed)
        VALUES ($1, $2, $3,$4, $5, $6)
        RETURNING *`,
      [title, video, course, image, duration, is_completed]
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
};
const getAlllessons = (req, res) => {
  pool
    .query(`SELECT * FROM lessons`)
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
};

const getlessonsById = (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM lessons WHERE id=$1`, [id])
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
};

const getlessonsByCourseId = (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM lessons WHERE course=$1 `, [id])
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
};

const deletelessonsById = (req, res) => {
  const { id } = req.params;

  pool
    .query(`DELETE FROM lessons WHERE id=$1 `, [id])
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
};

const updatelessonsById = (req, res) => {
  const { id } = req.params;
  const { title, video, course, image, duration, is_completed } = req.body;
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
      const newImage = image || lesson.image;
      const newDuration = duration || lesson.duration;
      const newIs_completed = is_completed || lesson.is_completed;
      return pool
        .query(
          "UPDATE lessons SET title = $1, video = $2, course=$3,  image=$4, duration=$5, is_completed=$6 WHERE id = $7 RETURNING *",
          [
            newTitle,
            newVideo,
            newCourse,
            newImage,
            newDuration,
            newIs_completed,
            id,
          ]
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
};

const isCourseCompleted = (req, res) => {
  const { coursesid, userid } = req.params;

  pool
    .query(
      `SELECT COUNT(*) AS remaining
       FROM lessons_users
       WHERE coursesid = $1
       AND userid = $2
       AND completed = false`,
      [coursesid, userid]
    )
    .then((result) => {
      const remaining = Number(result.rows[0].remaining);

      res.status(200).json({
        success: true,
        allCompleted: remaining === 0,
        remaining,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    });
};



const getCertificate = (req, res) => {
  const { courseId, userid } = req.params;


  /* 
  l.id AS lesson_id,
        l.title AS lesson_title,
        lu.completed */
  pool
    .query(
      `
      SELECT 
        *
      FROM lessons l
      LEFT JOIN lessons_users lu
        ON l.id = lu.lessonid AND lu.userid = $1
      WHERE l.course = $2
      `,
      [userid, courseId]
    )
    .then((result) => {
      // console.log(userid, coursesId);

      const lessons = result.rows;
      console.log(result.rows)
      if (result.rows.length === 0) {
        // console.clear()
        console.log(userid, courseId)
        return res.status(404).json({ message: "No lessons found for this course" });
      }

      const allCompleted = lessons.every((lesson) => lesson.completed === true);

      if (!allCompleted) {
        return res.status(200).json({ message: "Course not finished" });
      }

      return res.status(200).json({ message: "Course completed, certificate available" });
     

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    });
};

const addLessonsToCourse = (req, res) => {
  const { coursesid, userid } = req.body;

  pool
    .query(
      `
      INSERT INTO lessons_users (userid, lessonid, coursesid)
      SELECT $1, l.id, $2
      FROM lessons l
      WHERE l.courseid = $2
      AND NOT EXISTS (
        SELECT 1
        FROM lessons_users lu
        WHERE lu.userid = $1
        AND lu.lessonid = l.id
      )
      `,
      [userid, coursesid]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        lessonsAdded: result.rowCount,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Database error",
      });
    });
};



const getNumberOflessons = (req, res) => {
  pool.query(`SELECT
  c.id,
  c.title,
  COUNT(l.id) AS totallessons
FROM courses c
LEFT JOIN lessons l ON l.course = c.id
GROUP BY c.id, c.title
ORDER BY c.id;
`).then((result) => {
    res.status(200).json({
      success: true,
      message: `get all lessons`,
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

module.exports = {
  createlessons,
  getAlllessons,
  getlessonsById,
  deletelessonsById,
  updatelessonsById,
  getlessonsByCourseId,
  isCourseCompleted,
  getCertificate,
  addLessonsToCourse,
  getNumberOflessons
}
