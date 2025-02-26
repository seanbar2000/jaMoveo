import React, { useState } from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";

const MainPageAdmin = () => {
  // State for the search query and the songs
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const loggedInUser = location.state?.data;
  const navigate = useNavigate();

  const sendSearchRequest = async (searchValue) => {
    try {
      const response = await api.post("/main/search", {
        songName: searchValue,
      });
      if (response.status === 200) {
        navigate("/main/results", {
          state: {
            data: { user: loggedInUser, searchResults: response.data.songs },
          },
        });
        console.log(response.data.songs);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError("No songs with this name");
      }
    }
  };
  // Handle the input change for the search query
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("user:", loggedInUser);
    sendSearchRequest(searchQuery);
  };

  return (
    <div className="main-page-admin">
      <h1>Hey {loggedInUser.username}</h1>
      <h2>Search any song...</h2>
      <h3 style={{ color: "red" }}>{error}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter song name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default MainPageAdmin;
