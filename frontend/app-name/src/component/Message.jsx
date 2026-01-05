import React, { useState, useEffect } from "react";

const Message = ({ socket, user_id }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const receiveMessage = (data) => {
      setAllMessages((prev) => [...prev, data]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (!message || !to) return;

    socket.emit("message", {
      to,
      from: user_id,
      message,
    });

    setMessage("");
  };

  return (
    <div>
      <h2>Message</h2>

      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        type="text"
        placeholder="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <button onClick={sendMessage}>send</button>

      {allMessages.map((msg, index) => (
        <p key={index}>
          <strong>{msg.from}:</strong> {msg.message}
        </p>
      ))}
    </div>
  );
};

export default Message;
