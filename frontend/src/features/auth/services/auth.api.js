import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ;

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        success: false,
        message: "Network error. Please check your internet connection.",
      });
    }

    return Promise.reject(error.response.data);
  }
);

export const register = async (userData) => {
  const { data } = await API.post("/api/auth/register", userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await API.post("/api/auth/login", userData);
  return data;
};

export const logout = async () => {
  const { data } = await API.get("/api/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await API.get("/api/auth/get-me");
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await API.post("/api/auth/forgot-password", {
    email,
  });

  return data;
};

export const resetPassword = async (token, password) => {
  const { data } = await API.post(
    `/api/auth/reset-password/${token}`,
    { password }
  );

  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await API.patch("/api/auth/profile", payload);
  return data;
};

export const googleLogin = () => {
  window.location.href = `${BASE_URL}/api/auth/google/login`;
};

export const googleRegister = () => {
  window.location.href = `${BASE_URL}/api/auth/google/register`;
};

export default API;