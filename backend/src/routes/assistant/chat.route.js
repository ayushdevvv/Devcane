import express from "express";

import { chatLimiter } from "../../utils/usage/rateLimiter.js";
import { authUser } from "../../middlewares/auth.middleware.js";
import { chat,getAllSessions,getQuota,getChatHistory,deleteChatSession } from "../../controllers/assistant/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/", authUser, chatLimiter, chat);
chatRouter.get("/quota", authUser, getQuota);
chatRouter.get("/sessions", authUser, getAllSessions);
chatRouter.get("/history/:sessionId", authUser, getChatHistory);
chatRouter.delete("/history/:sessionId", authUser, deleteChatSession);

export default chatRouter;