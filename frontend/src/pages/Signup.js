import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { BASE_URL } from "../config";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/signup`,
        { username, email, password }
      );

      setMessage(res.data.message || "User created successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      const raw = err.response?.data?.message || "";

      let friendly = "Signup failed. Please check your details.";
      if (raw.includes("E11000") && raw.includes("username")) {
        friendly = "This username is already taken. Please choose another.";
      } else if (raw.includes("E11000") && raw.includes("email")) {
        friendly = "An account with this email already exists.";
      }

      setError(friendly);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background:
      "radial-gradient(circle at top left, #1f2933 0, #020617 55%, #000000 100%)",
    color: "#f9fafb",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 2.5rem",
    borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
    backdropFilter: "blur(8px)",
  };

  const brandStyle = {
    letterSpacing: "0.25em",
    fontSize: "0.95rem",
    fontWeight: 600,
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
    borderRadius: "18px",
    padding: "2.4rem 2.7rem",
    boxShadow:
      "0 18px 45px rgba(0,0,0,0.75), 0 0 0 1px rgba(148, 163, 184, 0.20)",
    border: "1px solid rgba(252, 211, 77, 0.20)",
  };

  const titleStyle = {
    fontSize: "1.7rem",
    fontWeight: 600,
    marginBottom: "0.25rem",
  };

  const subtitleStyle = {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    fontSize: "0.8rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
  };

  const inputWrapperStyle = {
    marginTop: "0.2rem",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.5)",
    backgroundColor: "rgba(15,23,42,0.9)",
    padding: "0.35rem 0.6rem",
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#f9fafb",
    fontSize: "0.95rem",
    padding: "0.35rem 0.15rem 0.45rem",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: "1.1rem",
    padding: "0.65rem 0.75rem",
    borderRadius: "999px",
    border: "none",
    backgroundImage:
      "linear-gradient(to right, #facc15, #f59e0b)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(250, 204, 21, 0.35)",
  };

  const errorBoxStyle = {
    marginTop: "0.9rem",
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
    backgroundColor: "rgba(248, 113, 113, 0.08)",
    color: "#fecaca",
    border: "1px solid rgba(248, 113, 113, 0.5)",
    fontSize: "0.85rem",
  };

  const messageBoxStyle = {
    marginTop: "0.9rem",
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
    backgroundColor: "rgba(34,197,94,0.08)",
    color: "#bbf7d0",
    border: "1px solid rgba(34,197,94,0.6)",
    fontSize: "0.85rem",
  };

  const footerTextStyle = {
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#9ca3af",
    textAlign: "center",
  };

  const linkStyle = {
    color: "#fbbf24",
    textDecoration: "none",
    fontWeight: 500,
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={brandStyle}>EMPLOYEE MANAGER</div>
      </header>

      <main style={mainStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Create Account</h1>
          <p style={subtitleStyle}>
            Sign up to start managing your employees.
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label style={labelStyle}>Username</label>
              <div style={inputWrapperStyle}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={inputStyle}
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: "0.85rem" }}>
              <label style={labelStyle}>Email</label>
              <div style={inputWrapperStyle}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: "0.85rem" }}>
              <label style={labelStyle}>Password</label>
              <div style={inputWrapperStyle}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="Choose a strong password"
                  required
                />
              </div>
            </div>

            <button type="submit" style={buttonStyle}>
              Signup
            </button>
          </form>

          {error && <div style={errorBoxStyle}>{error}</div>}
          {message && <div style={messageBoxStyle}>{message}</div>}

          <p style={footerTextStyle}>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
