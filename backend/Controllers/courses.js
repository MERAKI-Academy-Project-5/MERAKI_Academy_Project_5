const express = require("express");
const { pool } = require("../models/db");

const createNewCourse = (req, res) => {
  const { title, description, image, instructorId, stratCourse, endCourse} = req.body;
  pool
    .query(
      `INSERT INTO courses (title,description,image,instructorId,startCourse,endCourse) VALUES ($1,$2,$3,$4,$5,$6)`,
      [title, description, image, instructorId, stratCourse, endCourse]
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
  pool
    .query(`SELECT * FROM courses `)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All courses",
        "all courses": result.rows,
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
    .query(`SELECT * FROM courses WHERE ${id} =$1`, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        course: result.rows,
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
const deleteCoursesById = (req, res) => {
  const { id } = req.params;

  pool
    .query(`DELETE FROM corses WHERE id `)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Delete courses By Id: ${id} successfully`,
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
};
const updateCourseById = (req, res) => {
  const { course_id } = req.params.id;
  const { title, description, image, instructorId, strat, end } = req.body;
  pool.query(
    `UPDATE course SET title = COALESCE($1,title) , description = COALESCE($2,description) , image = COALESCE($3,image) , instructorId = COALESCE($4,instructorId) , strat =COALESCE($5,strat),end =COALESCE($6,end) WHERE course_id = $7 `,
    [title, description, image, instructorId, strat, end, course_id]
  );
};


module.exports = {
  createNewCourse,
  getAllcourses,
  getCourseById,
  deleteCoursesById,
  updateCourseById
};
