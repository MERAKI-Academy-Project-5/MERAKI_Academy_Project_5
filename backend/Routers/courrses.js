const express = require("express")
const courseRouter = express.Router();
const {createNewCourse} = require ("../controllers/courses")


courseRouter.post("/createNewCourse",createNewCourse)


module.exports =courseRouter