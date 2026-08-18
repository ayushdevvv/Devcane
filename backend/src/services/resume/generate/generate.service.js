import Groq from "groq-sdk";
import { buildPrompt } from "./prompt.js";
import { formatResume } from "./formatter.service.js";

const groq = new Groq({
    apiKey: process.env.GENERATE_API_KEY,
});

const callGroqWithRetry = async (data, attempts = 3) => {
    let lastErr;

    for (let i = 0; i < attempts; i++) {
        try {
            const completion = await groq.chat.completions.create({
                model: "openai/gpt-oss-120b",

                temperature: i === 0 ? 0.3 : 0,

                messages: [
                    {
                        role: "user",
                        content: buildPrompt(data),
                    },
                ],

                response_format: {
                    type: "json_object",
                },
            });

            const content =
                completion.choices?.[0]?.message?.content;

            if (!content) {
                throw new Error(
                    "AI returned an empty response."
                );
            }

            const result = JSON.parse(content);

            if (
                !result ||
                typeof result !== "object" ||
                Array.isArray(result)
            ) {
                throw new Error(
                    "AI returned an invalid resume object."
                );
            }

            return result;

        } catch (err) {
            lastErr = err;

            console.log(
                `⚠️ Groq generation attempt ${i + 1} failed:`,
                err.message
            );
        }
    }

    throw lastErr;
};

export const generateResume = async (data) => {
    const result = await callGroqWithRetry(data);

    return formatResume(result);
};