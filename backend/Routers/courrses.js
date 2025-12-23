const express = require("express");
const { createNewCourse, getAllcourses, getCourseById} = require("../Controllers/courses");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const courseRouter = express.Router();

const authentication = require("../middleware/authentication");
const { createNewCourse,getAllcourses,getCourseById} = require("../Controllers/courses");


//add permissions
courseRouter.post("/createNewCourse",authentication,createNewCourse)
courseRouter.get("/getAllcourses",authentication,getAllcourses)
courseRouter.get("/getCourseById/:id",authentication,getCourseById)


module.exports =courseRouter