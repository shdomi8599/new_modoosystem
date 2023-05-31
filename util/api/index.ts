import axios from "axios";

// axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
