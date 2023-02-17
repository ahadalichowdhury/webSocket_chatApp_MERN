import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("http://localhost:8000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (username !== "" || room !== "") {
      socket.emit("join_room", room);
      setShow(true);
    }
  };
  return (
    <div className="App">
      {!show ? (
        <div className="joinChatContainer">
          <h3>Join and Chat</h3>
          <input
            type="text"
            placeholder="John...."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
