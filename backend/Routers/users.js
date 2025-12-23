const express = require("express");
const usersRouter = express.Router();




const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { register, login, getAllUsers, updateUserById, deleteUserById } = require("../controllers/users");

usersRouter.get("/", authentication,getAllUsers );
usersRouter.post("/register",
register
);
usersRouter.post("/login", login);

usersRouter.put(
  "/:id",
  authentication,
  authorization("UPDATE_USERS"),
  updateUserById
);
usersRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_USERS"),
  deleteUserById
);



module.exports = usersRouter;