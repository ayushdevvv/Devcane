import Chat from "../models/chat.model.js";
import { generateChatResponse } from "../services/assistant/chat.service.js";
import {
  checkAndConsumeQuota,
  getQuotaStatus,
} from "../utils/usage/quota.util.js";

export const chat = async (req, res) => {
  try {
    const { prompt, sessionId } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    
    const quota = getQuotaStatus(req.user);

    if (quota.remaining <= 0) {
      return res.status(429).json({
        success: false,
        message: "Today's quota completed. Please come back tomorrow!",
        quota,
      });
    }

    let chatSession = null;

    if (sessionId) {
      chatSession = await Chat.findOne({
        sessionId,
        user: req.user._id,
      });
    }

    if (!chatSession) {
      chatSession = new Chat({
        user: req.user._id,
        title: prompt.slice(0, 60).trim(),
        messages: [],
      });
    }

    const history = chatSession.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    
    const aiResponse = await generateChatResponse(prompt, history);

 
    const updatedQuota = await checkAndConsumeQuota(req.user);

    chatSession.messages.push({
      role: "user",
      content: prompt,
    });

    chatSession.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    await chatSession.save();

    return res.status(200).json({
      success: true,
      sessionId: chatSession.sessionId,
      title: chatSession.title,
      response: aiResponse,
      quota: {
        used: updatedQuota.limit - updatedQuota.remaining,
        remaining: updatedQuota.remaining,
        limit: updatedQuota.limit,
        resetAt: updatedQuota.resetAt,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuota = async (req, res) => {
  try {
    const quota = getQuotaStatus(req.user);

    return res.status(200).json({
      success: true,
      quota,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Chat.find({
      user: req.user._id,
    })
      .select("sessionId title createdAt updatedAt")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatSession = await Chat.findOne({
      sessionId,
      user: req.user._id,
    });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: "Chat session not found",
      });
    }

    return res.status(200).json({
      success: true,
      sessionId: chatSession.sessionId,
      title: chatSession.title,
      messages: chatSession.messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const deleted = await Chat.findOneAndDelete({
      sessionId,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Chat session not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};