const express = require("express");
const usersRouter = express.Router();
// const {
//  reqister,
//   login,
//   getAllUsers,
//   deletUserById,
//   updateUserById,
//   getUserByName
// } = require("../controllers/userControllers");
// const authentication = require("../middleware/authentication");
// const authorization = require("../middleware/authorization");

// usersRouter.get("/", authentication, getAllUsers);
// usersRouter.get("/:firstName", authentication, getAllUsers);

// usersRouter.post("/register",
//   reqister
// );
// usersRouter.post("/login", login);

// usersRouter.put(
//   "/:id",
//   authentication,
//   authorization("UPDATE_USERS"),
//   updateUserById
// );
// usersRouter.delete(
//   "/:id",
//   authentication,
//   authorization("DELETE_USERS"),
//   deletUserById
// );

module.exports = usersRouter;