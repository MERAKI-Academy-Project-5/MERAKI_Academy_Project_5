const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();
const { pool } = require("./Models/db");
const rolesRouter = require("./routers/role");
const usersRouter = require("./routers/users");

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
