import { io } from "socket.io-client";

const socketInit = ({ userid, token }) => {
  const socket = io("http://localhost:5000", {
    auth: { userid, token },
  });

  socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
  socket.on("connect_error", (err) =>
    console.error("❌ Socket connection error:", err.message)
  );

  return socket;
};

export default socketInit;
