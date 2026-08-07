import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ;

const API = axios.create({
  baseURL: `${BASE_URL}/api/resume/analysis`,
  withCredentials: true,
  timeout: 60000,
});

export const uploadResume = async (formData) => {
  const { data } = await API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.resume;
};

export const generateAnalysis = async (id, jobDescription = "") => {
  const { data } = await API.post(`/${id}/analyze`, { jobDescription });
  return data;
};

export const getAnalysis = async (id) => {
  const { data } = await API.get(`/${id}`);
  return data.analysis;
};

export const getAllAnalysis = async () => {
  const { data } = await API.get("/");
  return data.analysis;
};

export const deleteAnalysis = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};

export const downloadReport = (id) =>
  window.open(`${API.defaults.baseURL}/${id}/download`, "_blank");

export const getResumeQuota = async () => {
  const { data } = await API.get("/quota");
  return data.quota;
};