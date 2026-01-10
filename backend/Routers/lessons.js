const express = require("express");
const { createlessons, getAlllessons, getlessonsById, deletelessonsById, updatelessonsById, getlessonsByCourseId, isCourseCompleted, getCertificate } = require("../Controllers/lessons");
const authentication = require("../middleware/authentication");

const lessonsRouter = express.Router();


lessonsRouter.post("/",authentication,createlessons )

lessonsRouter.get("/getAlllessons",authentication,getAlllessons)

lessonsRouter.get("/getlessonbyId/:id",authentication,getlessonsById)
lessonsRouter.get("/getlessonbyCourseId/:id",authentication,getlessonsByCourseId)
lessonsRouter.delete("/remove/:id",authentication,deletelessonsById)

lessonsRouter.put("/update/:id",authentication,updatelessonsById)
lessonsRouter.get("/isCompleted/:courseId", isCourseCompleted);
lessonsRouter.get("/certificate/:courseId", getCertificate);

module.exports = lessonsRouter;
