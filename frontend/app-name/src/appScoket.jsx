import { useEffect, useState } from "react";
import socketInit from "./socket/socketInit";
import Message from "./Message";

function Apps() {
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user_id || !token) return;

    const newSocket = socketInit({ user_id, token });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ connected");
    });

    newSocket.on("connect_error", (error) => {
      console.log("❌", error.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user_id, token]);

  return (
    <div>
      <h1>Socket.io</h1>

      <input
        placeholder="User ID"
        onChange={(e) => setUser_id(e.target.value)}
      />

      <input
        placeholder="Token"
        onChange={(e) => setToken(e.target.value)}
      />

      {/* render Message only when socket exists */}
      {socket && <Message socket={socket} user_id={user_id} />}
    </div>
  );
}

export default Apps;
