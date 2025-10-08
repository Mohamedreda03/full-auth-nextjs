import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, emailOTP, admin } from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";
import { sendEmail } from "./email";
import {
  emailVerificationTemplate,
  magicLinkTemplate,
  otpTemplate,
  passwordResetTemplate,
} from "./email-templates";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html: passwordResetTemplate(url),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify Your Email Address",
        html: emailVerificationTemplate(url, user.name),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [
    admin(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "✨ Your Magic Sign-In Link",
          html: magicLinkTemplate(url),
        });
      },
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await sendEmail({
          to: email,
          subject: `Your verification code: ${otp}`,
          html: otpTemplate(otp, type),
        });
      },
      otpLength: 6,
      expiresIn: 600, // 10 minutes
      overrideDefaultEmailVerification: false, // Keep both options available
    }),
  ],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookieSameSite: "lax",
  },
});

export type Session = typeof auth.$Infer.Session;
