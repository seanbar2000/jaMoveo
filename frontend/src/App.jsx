import React from "react";
import LoginComponent from "./loginComponents/loginComponent";
import SignUpComponent from "./signUpComponents/signUp";
import MainPageAdmin from "./mainPage/mainPageAdmin";
import SearchResultsPage from "./mainPage/resultPage";
import LivePage from "./livePageComponents/livePage";
import PlayerPage from "./mainPage/mainPagePlayer";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<SignUpComponent />} />
        <Route path="/main/admin" element={<MainPageAdmin />} />
        <Route path="/main" element={<PlayerPage />} />
        <Route path="/main/results" element={<SearchResultsPage />} />
        <Route path="/main/live" element={<LivePage />} />
      </Routes>
    </Router>
  );
};

export default App;
