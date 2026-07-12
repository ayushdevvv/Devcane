import express from "express";
import {
  chat,
  getAllSessions,
  getChatHistory,
  deleteChatSession,
  getQuota
} from "../controllers/chat.controller.js";
import { chatLimiter } from "../utils/usage/rateLimiter.js";
import { authUser } from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.post("/", authUser, chatLimiter, chat);
chatRouter.get("/quota", authUser, getQuota);
chatRouter.get("/sessions", authUser, getAllSessions);
chatRouter.get("/history/:sessionId", authUser, getChatHistory);
chatRouter.delete("/history/:sessionId", authUser, deleteChatSession);

export default chatRouter;