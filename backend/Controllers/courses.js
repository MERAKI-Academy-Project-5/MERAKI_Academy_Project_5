const express = require("express");
const { pool } = require("../Models/db");



const createNewCourse = (req, res) => {
  const { title, description, image, instructorId, strat, end } = req.body;
  pool.query(
    `INSERT INTO courses (title,description,image,instructorId,strat,end) VALUES ($1,$2,$3,$4,$5,$6,)`,
    [title, description, image, instructorId, strat, end]
  ).then((result) => {
      req.status(201).json({
        success: true,
        message: "course created successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        err: err,
      });
    });
};

const getAllcourses =(req,res)=>{
pool.query(`SELECT * FROM courses `).then((result) => {
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
}

const getCourseById= (req,res)=>{
    id=req.params.id
    pool.query(`SELECT * FROM courses WHERE ${id} =$1`,[id]).then((result) => {
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
}
module.exports = { createNewCourse, getAllcourses, getCourseById};
