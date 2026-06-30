

export const welcomeTemplate = (name) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:30px;">
    
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.1)">
      
      <h2 style="color:#333;text-align:center;">Welcome</h2>
      
      <p style="font-size:16px;color:#555;">
        Hello <strong>${name}</strong>,
      </p>

      <p style="font-size:16px;color:#555;">
        Your account has been successfully created. We’re excited to have you with us.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a href="#" style="background:#4CAF50;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;">
          Visit Dashboard
        </a>
      </div>

      <p style="font-size:14px;color:#888;">
        If you did not create this account, please ignore this email.
      </p>

      <hr>

      <p style="font-size:12px;color:#aaa;text-align:center;">
        © 2026 Devcane. All rights reserved.
      </p>

    </div>

  </div>
  `;
};

export const forgotPasswordTemplate = (resetLink) => {
  return `
  <div style="font-family: Arial, sans-serif; padding:30px; background:#f4f4f4;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:10px;">

      <h2 style="text-align:center;color:#333;">Reset Your Password</h2>

      <p>You requested to reset your password.</p>

      <div style="text-align:center;margin:20px 0;">
        <a href="${resetLink}" style="background:red;color:white;padding:12px 20px;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>
      </div>

      <p style="font-size:12px;color:#888;">
        If this wasn’t you, you can safely ignore this email.
      </p>

    </div>
  </div>
  `;
};

export const loginAlertTemplate = (ip, device, time) => {
  return `
  <div style="font-family: Arial, sans-serif; padding:30px; background:#f4f4f4;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:10px;">

      <h2 style="color:#333;">New Login Detected </h2>

      <p><strong>Device:</strong> ${device}</p>
      <p><strong>IP Address:</strong> ${ip}</p>
      <p><strong>Time:</strong> ${time}</p>

      <p style="margin-top:20px;color:#555;">
        If this was not you, please secure your account immediately.
      </p>

    </div>
  </div>
  `;
};