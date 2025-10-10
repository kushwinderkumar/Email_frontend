import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7262/api", 
  withCredentials: true              // cookies bhejne ke liye
});

export default api;
    