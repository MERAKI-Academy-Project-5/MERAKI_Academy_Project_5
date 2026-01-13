import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import socketInit from "./SocketServer";
import Message from "./component/Message";
import "./ChatPage.css";

const ChatPage = () => {
  const user_id =  localStorage.getItem("userId") || null;
  const token = useSelector((state) => state.auth.token);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
   console.log(user_id);
   console.log(token);
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const normalizedUsers = res.data.users.map((u) => ({
          ...u,
          id: u.id || u._id,
        }));
        setUsers(normalizedUsers);
        console.log("Fetched users:", normalizedUsers);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [token]);

  useEffect(() => {
    if (!user_id || !token) return;

    const newSocket = socketInit({ user_id, token });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [user_id, token]);

  console.log("Selected User:", selectedUser);
  console.log("Socket:", socket);

  return (
    <div className="chatpage-container">
      <div className="chat-users">
        <h3>Chats</h3>
        {users.map((user) => (
          <div
            key={user.id}
            className={`chat-user-item ${
              selectedUser?.id === user.id ? "active" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="avatar">{user.firstname[0].toUpperCase()}</div>
            <span>{user.firstname}</span>
          </div>
        ))}
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <span>
                {selectedUser.firstname} {selectedUser.lastname || ""}
              </span>
            </div>

            {socket ? (
              <Message
  socket={socket}
  user_id={String(user_id)}
  toUser={selectedUser ? String(selectedUser.id) : null}
/>
            ) : (
              <div className="chat-loading">Connecting...</div>
            )}
          </>
        ) : (
          <div className="chat-empty">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
