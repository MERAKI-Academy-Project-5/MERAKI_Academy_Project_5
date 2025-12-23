const express = require("express");
const rolesRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { createNewRole, updateRoleById, createNewPermissions, updatePermissionByRole } = require("../controllers/role");

rolesRouter.post("/", authentication,
  authorization("CREATE_ROLE"),createNewRole);
rolesRouter.put(
  "/:id",
  authentication,
  authorization("UPDATE_ROLE"),
  updateRoleById
);
rolesRouter.post("/permissions" ,  authentication,
  authorization("CREATE_PERMISSIONS"),createNewPermissions);

rolesRouter.put("/permissions" ,  authentication,
  authorization("UPDATE_PERMISSIONS"),updatePermissionByRole);



module.exports = rolesRouter;