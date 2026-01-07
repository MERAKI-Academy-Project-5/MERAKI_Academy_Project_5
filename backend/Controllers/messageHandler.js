const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    console.log(data)
    // data = { toUserId, fromUserId, message }
    const { to, from, message } = data;
    console.log(to, from, message)
    const msgData = {
      from,
      message,
      timestamp: new Date(),
    };

    // Send to recipient
    io.to("room-" + to).emit("message", msgData);
    console.log("room-" + to)
    // Send to sender for immediate display
    io.to("room-" + from).emit("message", msgData);
  });
};

module.exports = messageHandler;
