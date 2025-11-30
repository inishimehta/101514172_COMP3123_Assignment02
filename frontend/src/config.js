// frontend/src/config.js
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (isLocalhost ? "http://localhost:3001" : "http://backend:3001");
