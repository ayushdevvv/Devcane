import { createContext, useContext, useState, useEffect, useCallback } from "react";

import {
  uploadResume,
  generateAnalysis,
  getAnalysis as apiGetAnalysis,
  getAllAnalysis as apiGetAllAnalysis,
  deleteAnalysis as apiDeleteAnalysis,
  downloadReport,
  getResumeQuota,
} from "./ResumeAnalysis.api";

import { toast } from "react-toastify";

const ResumeAnalysisContext = createContext(null);

export const ResumeAnalysisProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analysisList, setAnalysisList] = useState([]);
  const [quota, setQuota] = useState(null);

  const fetchQuota = useCallback(async () => {
    try {
      const quota = await getResumeQuota();
      setQuota(quota);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchQuota();
  }, [fetchQuota]);

  const analyzeResume = async (formData) => {
    if (quota && quota.remaining <= 0) {
      toast.error("Today's resume analysis limit is over.");
      return;
    }

    setLoading(true);

    try {
      const resume = await uploadResume(formData);

      const result = await generateAnalysis(
        resume._id,
        formData.get("jobDescription")
      );

      if (result.quota) {
        setQuota(result.quota);
      }

      return result.analysis;
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 429 && data?.quota) {
        setQuota(data.quota);
        toast.error(data.message);
      } else {
        toast.error("Couldn't analyze your resume.");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAnalysis = async (id) => {
    setLoading(true);

    try {
      const data = await apiGetAnalysis(id);
      setAnalysis(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const getAllAnalysis = async () => {
    setLoading(true);

    try {
      const list = await apiGetAllAnalysis();
      setAnalysisList(list);
      return list;
    } finally {
      setLoading(false);
    }
  };

  const deleteResumeAnalysis = async (id) => {
    await apiDeleteAnalysis(id);
    setAnalysisList((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <ResumeAnalysisContext.Provider
      value={{
        loading,
        analysis,
        analysisList,
        quota,
        analyzeResume,
        getAnalysis,
        getAllAnalysis,
        deleteResumeAnalysis,
        downloadReport,
        fetchQuota,
      }}
    >
      {children}
    </ResumeAnalysisContext.Provider>
  );
};

export const useResumeAnalysis = () => {
  const context = useContext(ResumeAnalysisContext);

  if (!context) {
    throw new Error(
      "useResumeAnalysis must be used inside ResumeAnalysisProvider"
    );
  }

  return context;
};