import apiInstance from "../../config/brevo.js";

export const sendMail = async ({ to, subject, html }) => {
  try {
    const res = await apiInstance.post("/smtp/email", {
      sender: {
        name: "DEVCANE",
        email: process.env.EMAIL_FROM,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("📧 Email sent:", res.data.messageId);

    return res.data;
  } catch (error) {
    console.error(
      "❌ Brevo Email Error:",
      error.response?.data || error.message
    );
  }
};