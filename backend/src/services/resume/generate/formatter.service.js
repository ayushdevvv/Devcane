const cleanArray = arr => Array.isArray(arr) ? arr.filter(Boolean) : [];

export const formatResume = data => {
  const safe = data && typeof data === "object" ? data : {};

  return {
    ...safe,
    name: String(safe.name || "").trim(),
    title: String(safe.title || "").trim(),
    email: String(safe.email || "").trim(),
    phone: String(safe.phone || "").trim(),
    location: String(safe.location || "").trim(),
    links: {
      linkedin: String(safe.links?.linkedin || "").trim(),
      github: String(safe.links?.github || "").trim(),
      portfolio: String(safe.links?.portfolio || "").trim()
    },
    summary: String(safe.summary || "").trim(),
    education: cleanArray(safe.education),
    experience: cleanArray(safe.experience),
    projects: cleanArray(safe.projects),
    certifications: cleanArray(safe.certifications),
    achievements: cleanArray(safe.achievements),
    skills: {
      languages: cleanArray(safe.skills?.languages),
      frameworks: cleanArray(safe.skills?.frameworks),
      databases: cleanArray(safe.skills?.databases),
      tools: cleanArray(safe.skills?.tools),
      others: cleanArray(safe.skills?.others)
    }
  };
};