import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./mainPageAdmin.scss";

function PlayerPage() {
  const [songPicked, setSongPicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = location.state?.data;

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/main/ws");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const messageJson = JSON.parse(event.data);
      console.log(messageJson.song);
      if (messageJson.action === "song picked") {
        setSongPicked(true);
        navigate("/main/live", {
          state: {
            data: {
              user: loggedInUser,
              songData: messageJson.songData,
              song: JSON.parse(messageJson.song),
            },
          },
        });
      }
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  });

  return (
    <div>
      <h1>Waiting for the Admin to pick a song...</h1>
      {songPicked && <p>Redirecting to the live app...</p>}
    </div>
  );
}

export default PlayerPage;
