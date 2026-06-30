import rateLimit from "express-rate-limit";

// ─── Global Rate Limit (all routes) ───────────────────────────────
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes.",
  },
});

// ─── Chat Rate Limit (POST /api/chat only) ─────────────────────────
export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many chat requests, please slow down.",
  },
});