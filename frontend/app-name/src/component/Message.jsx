import { useEffect, useState } from "react";
import "./Message.css";

const Message = ({ socket, user_id, toUser }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // ================== Receive messages ==================
  useEffect(() => {
    if (!socket) return;

    const handler = (msg) => {
      console.log("Received message:", msg);
      setAllMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);
  }, [socket]);

  // ================== Send message ==================
  const sendMessage = () => {
    if (!message || !toUser) return;

    const msgData = {
      toUserId: toUser,
      fromUserId: user_id,
      message,
    };

    socket.emit("private_message", msgData);

    // Add immediately to sender view
    setAllMessages((prev) => [
      ...prev,
      { ...msgData, timestamp: new Date() },
    ]);

    setMessage("");
  };

  return (
    <div className="message-container">
      <div className="messages-list">
        {allMessages.map((m, index) => (
          <div
            key={index}
            className={`message ${
              m.fromUserId === user_id ? "mine" : "theirs"
            }`}
          >
            <span>{m.message}</span>
            <small>{new Date(m.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Message;
