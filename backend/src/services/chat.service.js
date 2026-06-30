import { askGroq } from "./ai/groq.service.js";

export const generateChatResponse = async (prompt, history = []) => {
  return await askGroq(prompt, history);
};