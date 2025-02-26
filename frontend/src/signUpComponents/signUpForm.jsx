import React, { useState } from "react";
import "./signUpForm.scss";

function SignUpForm({ signUpFunction }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [Instrument, setInstrument] = useState("");
  const [admin, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(admin);
    signUpFunction(userName, password, Instrument, admin);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(!admin);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h1>Sign up!</h1>

      <div className="input-group">
        <label htmlFor="username">User name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="Instrument">Instrument:</label>
        <input
          type="text"
          value={Instrument}
          onChange={(e) => setInstrument(e.target.value)}
        />
      </div>

      <div className="checkbox-group">
        <label>
          Admin:
          <input type="checkbox" onChange={handleCheckboxChange} />
        </label>
      </div>

      <div className="buttons-container">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignUpForm;
