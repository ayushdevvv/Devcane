
import { sendMail } from "../mail/sendMail.js";
import {
  welcomeTemplate,
  forgotPasswordTemplate,
  loginAlertTemplate,
} from "./mailTemplate.js";


export const sendWelcomeEmail = async (to, name) => {
  await sendMail({
    to,
    subject: "Welcome to Devcane 🎉",
    html: welcomeTemplate(name),
  });
};

export const sendForgotPasswordEmail = async (to, resetLink) => {
  await sendMail({
    to,
    subject: "Reset Your Password",
    html: forgotPasswordTemplate(resetLink),
  });
};


export const sendLoginAlertEmail = async (to, ip, device) => {
  await sendMail({
    to,
    subject: "New Login Detected",
    html: loginAlertTemplate(ip, device, new Date().toLocaleString()),
  });
};