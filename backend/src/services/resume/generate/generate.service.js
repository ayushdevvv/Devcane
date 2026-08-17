import Groq from "groq-sdk";

import { buildPrompt } from "./prompt.js";

import { formatResume } from "./formatter.service.js";

const groq = new Groq({ apiKey: process.env.GENERATE_API_KEY });

export const generateResume = async data => {

    const completion = await groq.chat.completions.create({

        model: "openai/gpt-oss-120b",

        temperature: .3,

        messages: [

            {

                role: "user",

                content: buildPrompt(data)

            }

        ],

        response_format: { type: "json_object" }

    });

    const result = JSON.parse(completion.choices[0].message.content);

    return formatResume(result);

};
