const express = require("express");
const upload = require("../middleware/upload");

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
  getStudentsByInstructorId,
  getDitinctStudentsByInstructorId,
  getCourseStudent,
} = require("../Controllers/courses");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const courseRouter = express.Router();

//add permissions
courseRouter.post(
  "/createNewCourse",
  authentication,
  upload.single("image"), // only one image for course
  createNewCourse
);
courseRouter.get("/getAllcourses", getAllcourses);
courseRouter.get("/getCourseById/:id", getCourseById);
courseRouter.get("/getCoursesByInstructorId/instructor/:id",   getCoursesByInstructorId);
courseRouter.get("/getDitinctStudentsByInstructorId/instructor/disticts/:instructorId",   getDitinctStudentsByInstructorId);
courseRouter.get("/getCoursesByStudentId/student/:id",   getCoursesBystudentId);
courseRouter.get("/allInstructors" , getAllcoursesInstructors)
courseRouter.get("/getStudentsByInstructorId/instructor/students/:instructorId" , getStudentsByInstructorId)
courseRouter.get("/Course/Student/:course/:student", getCourseStudent);
courseRouter.post("/addCourseToStudent", addCourseToStudent);

courseRouter.get("/getStudents",   getStudents);

courseRouter.delete(
  "/deleteCoursesById/:id",
  authentication,
  deleteCoursesById
);
courseRouter.put("/update/:id",authentication, updateCourseById)

module.exports = courseRouter;
