import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export const register = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  return data;
};

export const logout = async () => {
  const { data } = await API.get("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await API.get("/auth/get-me");
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await API.post("/auth/forgot-password", {
    email,
  });

  return data;
};

export const resetPassword = async (token, password) => {
  const { data } = await API.post(
    `/auth/reset-password/${token}`,
    { password }
  );

  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await API.patch("/auth/profile", payload);
  return data;
};

export default API;