const express = require("express");
const { pool } = require("../models/db");

const createNewCourse = (req, res) => {
  console.log("create");
  
  const {
    title,
    description,
    image,
    instructorId,
    category,
    startCourse,
    endCourse,
    price
  } = req.body;
  pool
    .query(
      `INSERT INTO courses (title,description,image,instructorId,category,startCourse,endCourse, price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        title,
        description,
        image,
        instructorId,
        category,
        startCourse,
        endCourse,
        price
      ]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "course created successfully",
        course: result.rows[0]
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(409).json({
        success: false,
        err: err,
      });
    });
};

const getAllcourses = (req, res) => {
  console.log("hi");

  pool
    .query(`SELECT * FROM courses `)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All courses",
        allcourses: result.rows,
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

const getCourseById = (req, res) => {
  id = req.params.id;
  pool
    .query(`SELECT * FROM courses WHERE id =$1`, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        course: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const deleteCoursesById = (req, res) => {
  const { id } = req.params;

  pool
    .query(`DELETE FROM courses WHERE id=${id} `)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Delete courses By Id: ${id} successfully`,
        courses: result.rows,
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
const updateCourseById = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    image,
    instructorId,
    category,
    startCourse,
    endCourse,
    price,
    rate,
  } = req.body;
  pool
    .query(
      `UPDATE courses SET title = COALESCE($1,title) , description = COALESCE($2,description) , image = COALESCE($3,image) , instructorId = COALESCE($4,instructorId) ,category=COALESCE($5,category), startCourse =COALESCE($6,startCourse) , endCourse =COALESCE($7,endCourse) ,price=COALESCE($8,price), rate=COALESCE($9,rate) WHERE id = $10 `,
      [
        title,
        description,
        image,
        instructorId,
        category,
        startCourse,
        endCourse,
        price,
        rate,
        id,
      ]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Update courses By Id: ${id} successfully`,
        courses: result.rows,
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
const getCoursesByInstructorId = (req, res) => {
  id = req.params.id;
  pool
    .query(`SELECT * FROM courses WHERE instructorid =$1`, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        courses: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const getCoursesBystudentId = (req, res) => {
  console.log("hi");

  id = req.params.id;
  pool
    .query(
      `SELECT
  u.id AS student_id,
  u.firstName,
  u.lastName,
  c.id AS course_id,
  c.title,
  c.category,
  c.price,
  c.image
FROM students_courses sc
JOIN users u ON sc.student = u.id
JOIN courses c ON sc.course = c.id
WHERE u.id = $1 `,
      [id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        courses: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const addCourseToStudent = (req, res) => {
  const { student, course } = req.body;
  pool
    .query(`INSERT INTO students_courses (student,course) VALUES ($1,$2)`, [
      student,
      course,
    ])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "course created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getStudents = (req, res) => {
  console.log("hi");
  pool
    .query(
      `SELECT
  c.id,
  c.title,
  COUNT(sc.student) AS totalstudents
FROM courses c
LEFT JOIN students_courses sc ON c.id = sc.course
GROUP BY c.id;`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        students: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const getAllcoursesInstructors = (req,res)=>{
  pool.query(`SELECT
    c.id AS course_id,
    c.title AS title,
    u.id AS instructor_id,
    u.firstName AS firstname,
    u.lastName AS lastname,
    u.role AS role
FROM courses c
LEFT JOIN users u ON c.instructorId = u.id
WHERE u.is_deleted = 0;`).then((result) => {
      res.status(200).json({
        success: true,
        instructors: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      }); 
    });
}
const getStudentsByInstructorId = (req, res) => {
    const instructorId = req.params.instructorId;

  console.log("hi");
  pool
    .query(
    `SELECT
  COUNT(u.id) OVER () AS totalstudents,
  u.id,
  u.firstname,
  u.lastname,
  u.email,
  u.image
FROM "students_courses" sc
JOIN "users" u ON sc.student = u.id
JOIN "courses" c ON sc.course = c.id
WHERE c.instructorid = $1; 
`, [instructorId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        students: result.rows,
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
const getDitinctStudentsByInstructorId = (req, res) => {
    const instructorId = req.params.instructorId;

  console.log("hi");
  pool
    .query(
    `SELECT DISTINCT
  u.id,
  u.firstname,
  u.lastname,
  u.email,
  u.image
FROM "students_courses" sc
JOIN "users" u ON sc.student = u.id
JOIN "courses" c ON sc.course = c.id
WHERE c.instructorid = $1; 
`, [instructorId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        students: result.rows,
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

const getCourseStudent = (req,res)=>{
  const {student , course} = req.params
   pool
    .query(
   ` SELECT *
FROM students_courses
WHERE student = $1
  AND course = $2;`,
   [student,course] )
    .then((result) => {
      res.status(200).json({
        success: true,
        studentCourse: result.rows,
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
  createNewCourse,
  getAllcourses,
  getCourseById,
  deleteCoursesById,
  updateCourseById,
  getCoursesByInstructorId,
  getCoursesBystudentId,
  addCourseToStudent,
  getStudents,
  getAllcoursesInstructors,
  getStudentsByInstructorId,
  getDitinctStudentsByInstructorId,
  getCourseStudent
 
};
