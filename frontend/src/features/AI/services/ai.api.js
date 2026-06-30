import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30000,
});


API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message;

    if (import.meta.env.DEV) {
      console.error(`API Error [${status}]:`, message);
    }

    return Promise.reject(error);
  }
);


export const sendPrompt = async (prompt, sessionId, mode = "generate") => {
  const { data } = await API.post("/chat", { prompt, sessionId, mode });
  return data;
};

export const getSessions = async () => {
  const { data } = await API.get("/chat/sessions");
  return data;
};

export const getHistory = async (sessionId) => {
  const { data } = await API.get(`/chat/history/${sessionId}`);
  return data;
};

export const deleteSession = async (sessionId) => {
  const { data } = await API.delete(`/chat/history/${sessionId}`);
  return data;
};

export const getQuota = async () => {
  const { data } = await API.get("/chat/quota");
  return data;
};

export default API;