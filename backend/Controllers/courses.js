const express = require("express");

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

}
module.exports = { createNewCourse, getAllcourses };
