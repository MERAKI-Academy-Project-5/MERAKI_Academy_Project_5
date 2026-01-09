const express = require("express");
const {
  createNewCourse,
  getAllcourses,
  getCourseById,
  deleteCoursesById,
  updateCourseById,
  getCoursesByInstructorId,
  getCoursesBystudentId,
} = require("../Controllers/courses");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const courseRouter = express.Router();

//add permissions
courseRouter.post("/createNewCourse", authentication, createNewCourse);
courseRouter.get("/getAllcourses", getAllcourses);
courseRouter.get("/getCourseById/:id", getCourseById);
courseRouter.get("/getCoursesByInstructorId/:id",   getCoursesByInstructorId);
courseRouter.get("/getCoursesByStudentId/student/:id",   getCoursesBystudentId);


courseRouter.delete(
  "/deleteCoursesById/:id",
  authentication,
  deleteCoursesById
);
courseRouter.put("/update/:id",authentication, updateCourseById)

module.exports = courseRouter;
