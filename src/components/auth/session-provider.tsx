"use client";

import { useSession } from "@/lib/auth-client";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useAuth() {
  const { data: session, isPending } = useSession();

  return {
    session,
    isLoading: isPending,
    isAuthenticated: !!session,
    user: session?.user,
  };
}
