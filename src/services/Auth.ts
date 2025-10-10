import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7262/api", 
});

// REGISTER
export const registerUser = async (data: { userName: string; userPassword: string }) => {
  return await API.post("/gmail/register", data);
};

// LOGIN
export const loginUser = async (data: { userName: string; userPassword: string }) => {
  return await API.post("/gmail/login", data);
};
