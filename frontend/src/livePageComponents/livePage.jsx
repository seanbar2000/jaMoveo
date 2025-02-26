import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../api";

const LivePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = location.state?.data.user;
  const songData = location.state?.data.songData;
  const song = location.state?.data.song;

  const [scrolling, setScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const broadcastQuit = async () => {
    const response = await api.get("/main/quit");

    if (response.status === 200) {
      if (loggedInUser.admin === true) {
        navigate("/main/admin", { state: { data: loggedInUser } });
      } else {
        navigate("/main");
      }
    }
  };

  const quit = (event) => {
    event.preventDefault();
    broadcastQuit();
  };

  useEffect(() => {
    if (loggedInUser.admin === false) {
      const socket = new WebSocket("ws://localhost:8080/main/ws");

      socket.onopen = () => {
        console.log("Connected to WebSocket server");
      };

      socket.onmessage = (event) => {
        if (event.data === "quit") {
          socket.close();
          navigate("/main", { state: { data: loggedInUser } });
        }
      };
    }
  });

  useEffect(() => {
    let interval;
    if (scrolling && songData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % songData.length);
        console.log(songData[currentIndex]);
      }, 3000); // Change lyrics every 3 seconds
    }
    return () => clearInterval(interval);
  }, [scrolling, songData.length]);

  const toggleScrolling = () => {
    setScrolling(!scrolling);
    console.log(songData[currentIndex]);
  };

  return (
    <div
      style={{
        backgroundColor: "#00246B",
        color: "#CADCFC",
        fontSize: "24px",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      {/* Song Title */}
      <h1>{song.name}</h1>
      <h3>{song.artist}</h3>
      {/* Lyrics & Chords Display */}
      <div
        style={{
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "32px",
        }}
      >
        {/* Display all lyrics and cords properly aligned */}
        <div style={{ marginBottom: "20px" }}>
          {(song.language === "he"
            ? songData[currentIndex]?.slice().reverse()
            : songData[currentIndex]
          ).map((line, i) => (
            <div
              key={i}
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              {/* Display cords if they exist */}
              {loggedInUser.instrument !== "singer" && line.chords && (
                <div
                  style={{
                    color: "#FFD700", // Color for cords
                    fontSize: "28px", // Smaller font size for cords
                    textAlign: "center", // Center the cords above the lyrics
                  }}
                >
                  {line.chords}
                </div>
              )}
              {/* Display lyrics under the cords if they exist */}
              <div
                style={{
                  color: "#ffffff", // Color for lyrics
                  fontSize: "32px", // Font size for the lyrics
                  textAlign: "center", // Center the lyrics
                }}
              >
                {line.lyrics}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toggleScrolling}
        style={{
          position: "fixed",
          top: "330px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "#1995AD",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        {scrolling ? "Stop Scrolling" : "Start Scrolling"}
      </button>

      {/* Quit Button (Only for Admin) */}
      {loggedInUser.admin ? (
        <pre>
          <button
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              padding: "10px 20px",
              backgroundColor: "#1995AD",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={quit}
          >
            Quit
          </button>
        </pre>
      ) : (
        <pre></pre>
      )}
    </div>
  );
};

export default LivePage;
