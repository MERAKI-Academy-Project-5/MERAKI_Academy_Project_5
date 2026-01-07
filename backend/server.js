const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const PORT = 5000;
require("dotenv").config();

const auth = require("./middleware/auth");
const messageHandler = require("./controllers/messageHandler");

app.use(express.json());
app.use(cors());

const rolesRouter = require("./routers/role");
const usersRouter = require("./routers/users");
const courseRouter = require("./routers/courrses");
const lessonsRouter = require("./Routers/lessons");
const favouritesRouter = require("./Routers/favourite");

app.use("/lessons", lessonsRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/courses", courseRouter);
app.use("/favourite", favouritesRouter)


// ================= SOCKET.IO =================

const server = http.createServer(app);

const io = socket(server, {
  cors: { origin: "*" },
});

// Auth middleware
io.use(auth);

io.on("connection", (socket) => {
  console.log("✅ connected:", socket.user.user_id);

  // Use the new message handler
  messageHandler(socket, io);

  socket.on("disconnect", () => {
    console.log("❌ disconnected:", socket.user.user_id);
  });
});



// ================= START SERVER =================

server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on http://localhost:${PORT}`);
});
