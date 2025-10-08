import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY not configured. Emails will not be sent.");
    console.log("📧 Would send email to:", to);
    console.log("Subject:", subject);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email sending error:", error);
      return;
    }

    console.log("✅ Email sent successfully:", data);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
