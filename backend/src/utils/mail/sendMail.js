import dotenv from "dotenv";
import apiInstance from "../../config/brevo.js";

dotenv.config();

export const sendMail = async ({ to, subject, html }) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        name: "DEVCANE",
        email: process.env.EMAIL_FROM,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error(
      "❌ Brevo Email Error:",
      error.response?.body || error.message || error
    );
  }
};