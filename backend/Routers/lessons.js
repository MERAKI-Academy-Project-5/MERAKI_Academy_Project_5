const express = require("express");
const { createlessons, getAlllessons, getlessonsById, deletelessonsById } = require("../Controllers/lessons");
const authentication = require("../middleware/authentication");

const lessonsRouter = express.Router();


lessonsRouter.post("/",authentication,createlessons )

lessonsRouter.get("/",authentication,getAlllessons)

lessonsRouter.get("/select/:id",authentication,getlessonsById)
lessonsRouter.delete("/remove/:id",authentication,deletelessonsById)


module.exports = lessonsRouter;
