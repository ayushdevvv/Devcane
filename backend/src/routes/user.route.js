import express from "express";
import passport from "passport";

import {
  createUser,
  login,
  logout,
  getMe,
  googleCallback,
  forgotPassword,
  resetPassword,
  updateProfile,
} from "../controllers/user.controller.js";

import { authUser } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);
authRouter.patch("/profile", authUser, updateProfile);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

authRouter.get("/logout", logout);
authRouter.get("/get-me", authUser, getMe);

authRouter.get("/google/login", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: "login",
    prompt: "consent select_account",
  })(req, res, next);
});

authRouter.get("/google/register", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: "register",
    prompt: "consent select_account",
  })(req, res, next);
});



authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  googleCallback
);

export default authRouter;