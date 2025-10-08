export function emailVerificationTemplate(url: string, userName?: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #4F46E5;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 24px 0;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #1f2937; margin-bottom: 24px;">Verify Your Email</h1>
          ${userName ? `<p>Hi ${userName},</p>` : ""}
          <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
          <div style="text-align: center;">
            <a href="${url}" class="button">Verify Email Address</a>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
            Or copy and paste this link into your browser:<br>
            <a href="${url}" style="color: #4F46E5; word-break: break-all;">${url}</a>
          </p>
          <div class="footer">
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function magicLinkTemplate(url: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #8B5CF6;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 24px 0;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #1f2937; margin-bottom: 24px;">✨ Sign In with Magic Link</h1>
          <p>Click the button below to sign in to your account:</p>
          <div style="text-align: center;">
            <a href="${url}" class="button">Sign In</a>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
            Or copy and paste this link into your browser:<br>
            <a href="${url}" style="color: #8B5CF6; word-break: break-all;">${url}</a>
          </p>
          <div class="footer">
            <p>This link will expire in 15 minutes.</p>
            <p>If you didn't request this link, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function otpTemplate(otp: string, type: string) {
  const titles = {
    "sign-in": "Sign In Code",
    "email-verification": "Email Verification Code",
    "forget-password": "Password Reset Code",
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #4F46E5;
            letter-spacing: 12px;
            text-align: center;
            padding: 24px;
            background-color: #F3F4F6;
            border-radius: 8px;
            margin: 24px 0;
            font-family: 'Courier New', monospace;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #1f2937; margin-bottom: 24px;">🔢 ${
            titles[type as keyof typeof titles] || "Verification Code"
          }</h1>
          <p>Use this code to complete your action:</p>
          <div class="otp-code">${otp}</div>
          <p style="text-align: center; color: #6b7280; font-size: 14px;">
            This code is valid for 10 minutes
          </p>
          <div class="footer">
            <p>If you didn't request this code, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function passwordResetTemplate(url: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #DC2626;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 24px 0;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #1f2937; margin-bottom: 24px;">🔒 Reset Your Password</h1>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center;">
            <a href="${url}" class="button">Reset Password</a>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">
            Or copy and paste this link into your browser:<br>
            <a href="${url}" style="color: #DC2626; word-break: break-all;">${url}</a>
          </p>
          <div class="footer">
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
