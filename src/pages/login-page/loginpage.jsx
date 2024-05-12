import React, { useState, useContext } from "react";
import "./loginpage.css"; // Make sure the CSS file is in the same directory
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/authcontext"; // Import AuthContext

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext); // Use AuthContext

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "Test School" && password === "School123") {
      setAuth(true); // Set auth state to true
      navigate("/Home"); // Navigate to Home page
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
