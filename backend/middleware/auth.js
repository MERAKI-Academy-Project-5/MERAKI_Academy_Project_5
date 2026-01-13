// middleware/auth.js
const auth = (socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.token;

  const user_id =
    socket.handshake.auth?.user_id ||
    socket.handshake.headers?.user_id;

  if (!token || !user_id) {
    return next(new Error("Unauthorized"));
  }

  socket.user = {
    user_id: String(user_id),
    token,
  };

  // ✅ join private room
  socket.join("room-" + socket.user.user_id);

  console.log("🔐 Authenticated:", socket.user.user_id);
  next();
};

module.exports = auth;
