import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";

import "../config/passport.js";

import chatRouter from "../routes/chat.route.js";
import authRouter from "../routes/user.route.js";
import { generalLimiter } from "../utils/rateLimiter.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());


app.use(passport.initialize());

app.use(generalLimiter);



app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;