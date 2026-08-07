import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ;

const API = axios.create({
  baseURL: `${BASE_URL}/api/resume/generate`,
  withCredentials: true,
  timeout: 60000,
});

export const uploadResumeForBuild = async (formData) => {
  const { data } = await API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.resume;
};

export const buildResume = async (payload) => {
  const { data } = await API.post("/build", payload);
  return data.resume;
};

export const getAllGeneratedResumes = async () => {
  const { data } = await API.get("/");
  return data.resumes;
};

export const getGeneratedResume = async (id) => {
  const { data } = await API.get(`/${id}`);
  return data.resume;
};


export const downloadGeneratedResume = (id) =>
  window.open(`${API.defaults.baseURL}/${id}/download`, "_blank");

export const deleteGeneratedResume = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};

export const getResumeQuota = async () => {
  const { data } = await API.get("/quota");
  return data.quota;
};
