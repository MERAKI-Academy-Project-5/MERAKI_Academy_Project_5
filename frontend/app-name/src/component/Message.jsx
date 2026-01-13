import { useEffect, useState } from "react";
import "./Message.css";

const Message = ({ socket, user_id, toUser }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // 🔄 reset chat when switching user
  useEffect(() => {
    setAllMessages([]);
  }, [toUser]);

  // ================= RECEIVE =================
  useEffect(() => {
    if (!socket) return;

    const handler = (msg) => {
      const isThisChat =
        (msg.from === user_id && msg.to === toUser) ||
        (msg.from === toUser && msg.to === user_id);

      if (!isThisChat) return;

      setAllMessages((prev) => [...prev, msg]);
    };

    socket.on("message", handler);
    return () => socket.off("message", handler);
  }, [socket, user_id, toUser]);

  // ================= SEND =================
  const sendMessage = () => {
    if (!message.trim() || !toUser) return;

    socket.emit("message", {
      to: toUser,
      message,
    });

    setMessage("");
  };

  return (
    <div className="message-container">
      <div className="messages-list">
        {allMessages.map((m, index) => (
          <div
            key={index}
            className={`message ${m.from === user_id ? "mine" : "theirs"}`}
          >
            <span>{m.message}</span>
            <small>
              {new Date(m.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
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
