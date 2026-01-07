const auth = (socket, next) => {
  const { token, userid } = socket.handshake.auth;

  if (!token || !userid) {
    return next(new Error("Unauthorized"));
  }

  socket.user = {
    user_id: String(userid),
    token,
  };

  // Join the user to a private room
  socket.join("room-" + socket.user.user_id);

  next();
};

module.exports = auth;
