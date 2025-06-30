// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.gubcpa.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
