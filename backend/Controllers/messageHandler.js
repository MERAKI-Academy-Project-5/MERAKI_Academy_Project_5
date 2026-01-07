const messageHandler = (socket, io) => {
  socket.on("private_message", (data) => {
    // data = { toUserId, fromUserId, message }

    const { toUserId, fromUserId, message } = data;

    const msgData = {
      fromUserId,
      message,
      timestamp: new Date(),
    };

    // Send to recipient
    io.to("room-" + toUserId).emit("receive_message", msgData);

    // Send to sender for immediate display
    io.to("room-" + fromUserId).emit("receive_message", msgData);
  });
};

module.exports = messageHandler;
