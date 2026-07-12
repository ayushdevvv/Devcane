import { generateToken } from "./generateToken.js";

export const sendToken = (
  user,
  statusCode,
  res,
  redirect = false,
  state = "login"
) => {
  const token = generateToken(user._id);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  if (redirect) {
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }

  return res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      provider: user.provider,
    },
  });
};