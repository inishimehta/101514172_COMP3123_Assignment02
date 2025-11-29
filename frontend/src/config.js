// frontend/src/config.js
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const BASE_URL = isLocalhost
  ? "http://localhost:3001"   // browser -> backend via exposed port
  : "http://backend:3001";    // container -> backend inside Docker network