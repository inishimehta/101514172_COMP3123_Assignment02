import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const body =
        emailOrUsername.includes("@")
          ? { email: emailOrUsername, password }
          : { username: emailOrUsername, password };

      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, body);

      const token = res.data.jwt_token;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (res.data.user_id) {
        localStorage.setItem("user_id", res.data.user_id);
      }

      navigate("/employees");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid username/email or password."
      );
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username or Email</label>
          <br />
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: "1rem" }}>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
