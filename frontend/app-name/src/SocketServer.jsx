import { io } from "socket.io-client";

const socketInit = ({ user_id, token }) => {
  const socket = io("http://localhost:5000", {
    auth: { user_id, token },
  });

  socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
  socket.on("connect_error", (err) =>
    console.error("❌ Socket connection error:", err.message)
  );

  return socket;
};

export default socketInit;
