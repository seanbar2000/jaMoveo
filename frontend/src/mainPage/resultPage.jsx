import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import "./resultPage.scss";

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = location.state?.data.user;
  const searchResults = location.state?.data.searchResults;

  const handleSongSelect = async (song) => {
    console.log(song);
    const response = await api.get("/main/search/" + song.karaoke_file_name);
    if (response.status === 200) {
      navigate("/main/live", {
        state: {
          data: { song: song, user: loggedInUser, songData: response.data },
        },
      });
    }
  };

  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      <h3>{loggedInUser.username}</h3>
      <ul>
        {searchResults.map((song, index) => (
          <li key={index} onClick={() => handleSongSelect(song)}>
            {song.imageUrl ? (
              <img src={song.imageUrl} alt={song.name} />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                }}
              ></div>
            )}
            <div style={{ textAlign: "center" }}>
              <h4>{song.name}</h4>
              <p>{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
