import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import {
  uploadResumeForBuild as apiUploadResumeForBuild,
  buildResume as apiBuildResume,
  getGeneratedResume as apiGetGeneratedResume,
  getAllGeneratedResumes as apiGetAllGeneratedResumes,
  getResumeQuota as apiGetResumeQuota,
} from "./generate.api";

const ResumeGenerateContext = createContext(null);

const uid = () =>
  (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`);

const emptyEducation = () => ({ id: uid(), institution: "", degree: "", field: "", cgpa: "", startDate: "", endDate: "" });
const emptyExperience = () => ({ id: uid(), company: "", role: "", location: "", startDate: "", endDate: "", current: false, description: [""] });
const emptyProject = () => ({ id: uid(), title: "", techStack: "", github: "", live: "", description: [""] });
const emptyCertification = () => ({ id: uid(), title: "", issuer: "", issueDate: "" });
const emptyAchievement = () => ({ id: uid(), title: "", description: "" });

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  links: { linkedin: "", github: "", portfolio: "" },
  summary: "",
  education: [emptyEducation()],
  experience: [emptyExperience()],
  projects: [emptyProject()],
  skills: { languages: "", frameworks: "", databases: "", tools: "", others: "" },
  certifications: [],
  achievements: [],
};

export const ResumeGenerateProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeList, setResumeList] = useState([]);
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




  const updateBasicInfo = (patch) => setFormData((f) => ({ ...f, ...patch }));
  const updateLinks = (patch) => setFormData((f) => ({ ...f, links: { ...f.links, ...patch } }));
  const updateSkills = (patch) => setFormData((f) => ({ ...f, skills: { ...f.skills, ...patch } }));

  const makeListHelpers = (key, factory) => ({
    add: () => setFormData((f) => ({ ...f, [key]: [...f[key], factory()] })),
    update: (id, patch) =>
      setFormData((f) => ({
        ...f,
        [key]: f[key].map((item) => (item.id === id ? { ...item, ...patch } : item)),
      })),
    remove: (id) => setFormData((f) => ({ ...f, [key]: f[key].filter((item) => item.id !== id) })),
  });

  const education = makeListHelpers("education", emptyEducation);
  const experience = makeListHelpers("experience", emptyExperience);
  const projects = makeListHelpers("projects", emptyProject);
  const certifications = makeListHelpers("certifications", emptyCertification);
  const achievements = makeListHelpers("achievements", emptyAchievement);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(0, s - 1));
  const goToStep = (s) => setStep(s);

  const resetBuilder = () => {
    setFormData(initialFormData);
    setStep(0);
    setResume(null);
  };

  const toCsvArray = (str = "") => str.split(",").map((s) => s.trim()).filter(Boolean);

const submitScratch = async () => {
  if (quota && quota.remaining <= 0) {
    toast.error("Today's resume generation limit is over.");
    return;
  }

  setLoading(true);

  try {
    const payload = {
      mode: "scratch",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      links: formData.links,
      summary: formData.summary,
      education: formData.education.map(({ id, ...rest }) => rest),
      experience: formData.experience.map(({ id, ...rest }) => ({
        ...rest,
        description: rest.description.filter(Boolean),
      })),
      projects: formData.projects.map(({ id, techStack, ...rest }) => ({
        ...rest,
        techStack: toCsvArray(techStack),
        description: rest.description.filter(Boolean),
      })),
      skills: Object.fromEntries(
        Object.entries(formData.skills).map(([k, v]) => [
          k,
          toCsvArray(v),
        ])
      ),
      certifications: formData.certifications.map(({ id, ...rest }) => rest),
      achievements: formData.achievements.map(({ id, ...rest }) => rest),
    };

    const built = await apiBuildResume(payload);

    if (built.quota) {
      setQuota(built.quota);
    }

    setResume(built.resume || built);

    return built.resume || built;
  } catch (err) {
  console.log(err.response?.data);

  toast.error(
    err?.response?.data?.message ||
    err.message ||
    "Couldn't generate your resume."
  );

  throw err;

  } finally {
    setLoading(false);
  }
};

const submitImport = async (file) => {
  if (quota && quota.remaining <= 0) {
    toast.error("Today's resume generation limit is over.");
    return;
  }

  setLoading(true);

  try {
    const uploadPayload = new FormData();
    uploadPayload.append("resume", file);

    const uploaded = await uploadResumeForBuild(uploadPayload);

    const built = await apiBuildResume({
      mode: "import",
      resumeId: uploaded._id,
    });

    if (built.quota) {
      setQuota(built.quota);
    }

    setResume(built.resume || built);

    return built.resume || built;
  } catch (err) {
    if (err?.response?.status === 429 && err.response.data.quota) {
      setQuota(err.response.data.quota);
    }

    toast.error(
      err?.response?.data?.message ||
        "Couldn't generate your resume."
    );

    throw err;
  } finally {
    setLoading(false);
  }
};

  const getResume = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await apiGetGeneratedResume(id);
      setResume(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllGeneratedResumes = useCallback(async () => {
    try {
      const list = await apiGetAllGeneratedResumes();
      setResumeList(list || []);
      return list;
    } catch (err) {
      console.log(err);
      setResumeList([]);
    }
  }, []);

  return (
    <ResumeGenerateContext.Provider
      value={{
        formData,
        step,
        loading,
        resume,
        resumeList,
        updateBasicInfo,
        updateLinks,
        updateSkills,
        education,
        experience,
        projects,
        certifications,
        achievements,
        nextStep,
        prevStep,
        goToStep,
        resetBuilder,
        submitScratch,
        submitImport,
        getResume,
        getAllGeneratedResumes,
        quota,
        fetchQuota,
      }}
    >
      {children}
    </ResumeGenerateContext.Provider>
  );
};

export const useResumeGenerate = () => {
  const ctx = useContext(ResumeGenerateContext);
  if (!ctx) {
    throw new Error("useResumeGenerate must be used inside ResumeGenerateProvider");
  }
  return ctx;
};