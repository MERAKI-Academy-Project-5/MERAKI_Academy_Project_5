const express = require("express");
const { createNewCourse, getAllcourses, getCourseById, deleteCoursesById} = require("../Controllers/courses");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const courseRouter = express.Router();


//add permissions
courseRouter.post("/createNewCourse",authentication,createNewCourse)
courseRouter.get("/getAllcourses",authentication,getAllcourses)
courseRouter.get("/getCourseById/:id",authentication,getCourseById)
courseRouter.delete("/deleteCoursesById/:id",authentication,deleteCoursesById)


module.exports =courseRouter