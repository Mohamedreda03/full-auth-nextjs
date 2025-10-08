"use client";

import { useAuth } from "@/components/auth/session-provider";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { session, isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back to your dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-semibold">Name:</span> {user?.name || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Email Verified:</span>{" "}
              {user?.emailVerified ? "Yes" : "No"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Information</CardTitle>
            <CardDescription>Current session details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-semibold">Session ID:</span>{" "}
              {session?.session.id.slice(0, 20)}...
            </div>
            <div>
              <span className="font-semibold">Expires At:</span>{" "}
              {new Date(session?.session.expiresAt || "").toLocaleDateString()}
            </div>
            <div className="pt-4">
              <Button
                onClick={async () => {
                  await signOut();
                  router.push("/sign-in");
                }}
                variant="destructive"
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
