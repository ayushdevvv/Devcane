import Groq from "groq-sdk";
import dotenv from "dotenv";
import { RESUME_ANALYSIS_PROMPT } from "./prompt.js";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.RESUME_API_KEY
});

export const analyzeResume = async (resumeText, jobDescription = "", userPrompt = "") => {

    try {

        const completion = await groq.chat.completions.create(
            {
                model: "llama-3.3-70b-versatile",
                temperature: 0.3,
                max_tokens: 1200,
                response_format: { type: "json_object" },
                messages: [
                    {
                        role: "system",
                        content: RESUME_ANALYSIS_PROMPT,
                    },
                    {
                        role: "user",
                        content: `
RESUME
${resumeText}

JOB DESCRIPTION
${jobDescription}

USER PROMPT
${userPrompt}
`,
                    },
                ],
            },
            {
                timeout: 60000,
            }
        );

        const raw = completion.choices[0]?.message?.content;

        if (!raw) throw new Error("Empty AI Response");

        const result = JSON.parse(raw);

        const normalized = {
            matchScore: Number(result.matchScore) || 0,

            summary: result.summary || "",

            strengths: Array.isArray(result.strengths)
                ? result.strengths
                : [],

            weaknesses: Array.isArray(result.weaknesses)
                ? result.weaknesses
                : [],
            skillGap: Array.isArray(result.skillGap)
                ? result.skillGap.map((item) => {
                    if (typeof item === "string") {
                        return {
                            skill: item,
                            severity: "medium",
                        };
                    }

                    return {
                        skill: item.skill || "",
                        severity: ["low", "medium", "high"].includes(item.severity)
                            ? item.severity
                            : "medium",
                    };
                })
                : [],

            keywordMatch: Array.isArray(result.keywordMatch)
                ? result.keywordMatch
                : [],

            missingKeywords: Array.isArray(result.missingKeywords)
                ? result.missingKeywords
                : [],

            atsTips: Array.isArray(result.atsTips)
                ? result.atsTips
                : [],

            learningRoadmap: Array.isArray(result.learningRoadmap)
                ? result.learningRoadmap
                : [],
        };

        if (normalized.matchScore > 0 && normalized.matchScore <= 1)
            normalized.matchScore *= 100;

        normalized.matchScore = Math.max(
            0,
            Math.min(Math.round(normalized.matchScore), 100)
        );

        console.dir(normalized, { depth: null });

        return normalized;
    } catch (err) {

        console.log(err.message);

        throw new Error("Resume Analysis Failed");

    }

};