import React, { useState } from "react";
import "./loginForm.scss";

const LoginForm = ({ loginFunction, signUp }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginFunction(userName, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="buttons-container">
          <button type="submit">Login</button>
          <button type="button" onClick={signUp}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
