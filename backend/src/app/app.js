import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import "../config/passport.js";
import chatRouter from "../routes/assistant/chat.route.js";
import authRouter from "../routes/auth/user.route.js";
import { generalLimiter } from "../utils/usage/rateLimiter.js";
import generateRouter from "../routes/resume/generate.route.js";
import AnalysisRouter from "../routes/resume/Analysis.route.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: "https://devcane.vercel.app",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());


app.use(passport.initialize());

app.use(generalLimiter);


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Devcane API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Devcane Backend Running ",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/resume/analysis", AnalysisRouter);
app.use("/api/resume/generate", generateRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;