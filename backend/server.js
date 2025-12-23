const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();



const lessonsRouter=require("./Routers/lessons")

app.use(express.json());




app.use("/lessons", lessonsRouter)




const { pool } = require("./models/db");

const rolesRouter = require("./routers/role");
const usersRouter = require("./routers/users");
const courseRouter = require("./routers/courrses")


app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/courses",courseRouter)
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
