const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const auth = require("./middleware/auth");
const messageHandler = require("./controllers/messageHandler");

// Routers
const rolesRouter = require("./routers/role");
const usersRouter = require("./routers/users");
const coursesRouter = require("./routers/courrses");
const lessonsRouter = require("./Routers/lessons");
const favouritesRouter = require("./Routers/favourite");

const PORT = process.env.PORT || 5000;

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================
app.use("/lessons", lessonsRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/courses", coursesRouter);
app.use("/favourite", favouritesRouter);

// ================= SOCKET.IO =================
const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: "*" },
});

// Socket auth middleware
io.use(auth);

io.on("connection", (socket) => {
  console.log("✅ Connected:", socket.user.user_id);

  // Handle messages
  messageHandler(socket, io);

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.user.user_id);
  });
});

// ================= START SERVER =================
server.listen(PORT, () => {
  console.log(`Server running with Socket.IO on http://localhost:${PORT}`);
});
