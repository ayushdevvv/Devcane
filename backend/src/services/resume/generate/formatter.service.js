const cleanArray = arr => Array.isArray(arr) ? arr.filter(Boolean) : [];

export const formatResume = data => ({

    ...data,

    summary: data.summary?.trim() || "",

    education: cleanArray(data.education),

    experience: cleanArray(data.experience),

    projects: cleanArray(data.projects),

    certifications: cleanArray(data.certifications),

    achievements: cleanArray(data.achievements),

    skills: {

        languages: cleanArray(data.skills?.languages),

        frameworks: cleanArray(data.skills?.frameworks),

        databases: cleanArray(data.skills?.databases),

        tools: cleanArray(data.skills?.tools),

        others: cleanArray(data.skills?.others)

    }

});