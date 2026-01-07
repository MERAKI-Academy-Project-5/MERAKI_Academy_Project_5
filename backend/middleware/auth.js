const auth = (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.token;
  const user_id = socket.handshake.auth.user_id || socket.handshake.headers.user_id;

  console.log(socket.handshake.headers || socket.handshake.auth);
  console.log(socket.handshake);
  if (!token || !user_id) {
    console.log(user_id, token);

    return next(new Error("Unauthorized"));
  }

  socket.user = {
    user_id: String(user_id),
    token,
  };

  // Join the user to a private room
  socket.join("room-" + socket.user.user_id);

  next();
};

module.exports = auth;
