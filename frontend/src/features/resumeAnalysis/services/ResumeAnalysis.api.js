import axios from "axios";

const API = axios.create({
 baseURL: `${import.meta.env.VITE_API_URL}/api/resume-analysis`,
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
  const { data } = await API.post(`/generate/${id}`, { jobDescription });
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

export const getResumeQuota = async ()=>{
  const { data } = await API.get("/quota");
  return data.quota;
}