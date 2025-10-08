"use client";

import { signOut, useSession, useAdmin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2Icon,
  UserIcon,
  ShieldCheckIcon,
  MailIcon,
  CalendarIcon,
  LogOutIcon,
  ShieldIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = useSession();
  const { isAdmin } = useAdmin();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2Icon className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <UserIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Welcome!</CardTitle>
            <CardDescription>
              Please sign in to view your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sign-in" className="block">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </Link>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Welcome back, {user.name}!
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="lg">
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* User Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.image && (
                <div className="flex justify-center">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-24 w-24 rounded-full border-4 border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User ID
                </p>
                <p className="font-mono text-sm text-gray-900 dark:text-white">
                  {user.id}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MailIcon className="h-5 w-5" />
                Email Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Email Address
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verification Status
                </p>
                <div className="flex items-center gap-2">
                  {user.emailVerified ? (
                    <>
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-600">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-orange-600">
                        Not Verified
                      </span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role & Security Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldIcon className="h-5 w-5" />
                Role & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User Role
                </p>
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <>
                      <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-600">
                        Administrator
                      </span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-600">User</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Account Status
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-600">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Session Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Session ID
                </p>
                <p className="truncate font-mono text-sm text-gray-900 dark:text-white">
                  {session.session.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expires At
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(session.session.expiresAt).toLocaleString()}
                </p>
              </div>
              {session.session.ipAddress && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    IP Address
                  </p>
                  <p className="font-mono text-sm text-gray-900 dark:text-white">
                    {session.session.ipAddress}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Account Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Account Created
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last Updated
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(user.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isAdmin && (
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full">
                    <ShieldCheckIcon className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Link href="/settings" className="block">
                <Button variant="outline" className="w-full">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <Card className="mt-6 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <ShieldCheckIcon className="h-6 w-6" />
                Administrator Panel
              </CardTitle>
              <CardDescription>
                You have administrative privileges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                As an administrator, you have access to advanced features and
                user management capabilities.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <Card className="mt-6 border-dashed">
            <CardHeader>
              <CardTitle className="text-sm">
                Debug Info (Development Only)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="overflow-auto rounded-md bg-gray-100 p-4 text-xs dark:bg-gray-800">
                {JSON.stringify(session, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
