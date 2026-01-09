const express = require("express");
const { pool } = require("../models/db");

const createNewCourse = (req, res) => {
  const { title, description, image, instructorId, startCourse, endCourse, price, rate } = req.body;
  pool
    .query(
      `INSERT INTO courses (title,description,image,instructorId,startCourse,endCourse, price,rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [title, description, image, instructorId, startCourse, endCourse, price, rate]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "course created successfully",
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
  const { title, description, image, instructorId, startCourse, endCourse, price, rate } = req.body;
  pool.query(
    `UPDATE courses SET title = COALESCE($1,title) , description = COALESCE($2,description) , image = COALESCE($3,image) , instructorId = COALESCE($4,instructorId) , startCourse =COALESCE($5,startCourse) , endCourse =COALESCE($6,endCourse) ,price=COALESCE($7,price), rate=COALESCE($8,rate) WHERE id = $9 `,
    [title, description, image, instructorId, startCourse, endCourse, price, rate, id]
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
    .query(`SELECT * FROM students_courses WHERE student =$1`, [id])
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
module.exports = {
  createNewCourse,
  getAllcourses,
  getCourseById,
  deleteCoursesById,
  updateCourseById,
  getCoursesByInstructorId,
  getCoursesBystudentId
};
