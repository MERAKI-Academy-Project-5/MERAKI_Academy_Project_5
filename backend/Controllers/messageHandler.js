// controllers/messageHandler.js
const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    const { to, message } = data;

    if (!to || !message) return;

    const msgData = {
      from: socket.user.user_id, // ✅ TRUST SERVER ONLY
      to,
      message,
      timestamp: new Date(),
    };

    // ✅ send to receiver
    io.to("room-" + to).emit("message", msgData);

    // ✅ send to sender (for sync across tabs/devices)
    io.to("room-" + socket.user.user_id).emit("message", msgData);
  });
};

module.exports = messageHandler;
