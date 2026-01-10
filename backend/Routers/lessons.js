const express = require("express");
 
const { createlessons, getAlllessons, getlessonsById, deletelessonsById, updatelessonsById, getlessonsByCourseId, isCourseCompleted, getCertificate, addLessonsToCourse } = require("../Controllers/lessons");

const { createlessons, getAlllessons, getlessonsById, deletelessonsById, updatelessonsById, getlessonsByCourseId, isCourseCompleted, getCertificate, getNumberOflessons } = require("../Controllers/lessons");
 
const authentication = require("../middleware/authentication");

const lessonsRouter = express.Router();


lessonsRouter.post("/",authentication,createlessons )

lessonsRouter.get("/getAlllessons",authentication,getAlllessons)
lessonsRouter.get("/getLessonsforallcourses" , getNumberOflessons)
lessonsRouter.get("/getlessonbyId/:id",authentication,getlessonsById)
lessonsRouter.get("/getlessonbyCourseId/:id",authentication,getlessonsByCourseId)
lessonsRouter.delete("/remove/:id",authentication,deletelessonsById)

lessonsRouter.put("/update/:id",authentication,updatelessonsById)
lessonsRouter.get("/isCompleted/:courseId/:userid", isCourseCompleted);
lessonsRouter.get("/certificate/:courseId", getCertificate);
lessonsRouter.post("/addLessonsToCourse",addLessonsToCourse)

module.exports = lessonsRouter;
