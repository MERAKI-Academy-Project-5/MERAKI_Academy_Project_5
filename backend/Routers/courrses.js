const express = require("express");
const {
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
courseRouter.get("/allInstructors" , getAllcoursesInstructors)
courseRouter.post("/addCourseToStudent", addCourseToStudent);

courseRouter.get("/getStudents",   getStudents);

courseRouter.delete(
  "/deleteCoursesById/:id",
  authentication,
  deleteCoursesById
);
courseRouter.put("/update/:id",authentication, updateCourseById)

module.exports = courseRouter;
