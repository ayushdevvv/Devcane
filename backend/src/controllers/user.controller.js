import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { blacklistModel } from "../models/blacklist.model.js";
import { sendToken } from "../utils/sendToken.js";
import {
  sendWelcomeEmail,
  sendLoginAlertEmail,
  sendForgotPasswordEmail,
} from "../utils/mail/mailService.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPass,
      provider: "local",
    });

    sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.log("Welcome email failed:", err)
    );

    return sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (user.provider !== "local") {
      return res.status(400).json({
        success: false,
        message: `This account uses ${user.provider} login. Please continue with Google.`,
      });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    sendLoginAlertEmail(
      user.email,
      req.ip,
      req.headers["user-agent"]
    ).catch((err) =>
      console.log("Login alert email failed:", err)
    );

    return sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    if (user.isNewUser) {
      sendWelcomeEmail(user.email, user.name).catch((err) =>
        console.log("Google welcome email failed:", err)
      );
    } else {
      sendLoginAlertEmail(
        user.email,
        req.ip,
        req.headers["user-agent"]
      ).catch((err) =>
        console.log("Google login alert email failed:", err)
      );
    }

    return sendToken(user, 200, res, true);
  } catch (error) {
    console.log(error);
    return res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token) {
      await blacklistModel.create({ token });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    sendForgotPasswordEmail(user.email, resetLink).catch((err) =>
      console.log("Forgot password email error:", err)
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

  
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  
    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword } = req.body;

 
    if (name && name.trim()) {
      req.user.name = name.trim();
    }


    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Both current and new password are required.",
        });
      }

      if (req.user.provider !== "local") {
        return res.status(400).json({
          success: false,
          message: "Google accounts cannot change password.",
        });
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        req.user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect.",
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters.",
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          success: false,
          message: "New password must be different.",
        });
      }

      req.user.password = await bcrypt.hash(newPassword, 10);
    }

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};