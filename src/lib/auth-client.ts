"use client";

import { createAuthClient } from "better-auth/react";
import {
  magicLinkClient,
  emailOTPClient,
  adminClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [magicLinkClient(), emailOTPClient(), adminClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  admin: adminActions,
} = authClient;

// Admin helper functions
export const useAdmin = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return {
    isAdmin,
    ...adminActions,
  };
};
