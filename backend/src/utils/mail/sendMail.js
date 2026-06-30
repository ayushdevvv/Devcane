

import transporter from "../../config/nodemailer.js";

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"DEVCANE" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.log("❌ Email send error:", error);
  }
};