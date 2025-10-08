"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn, authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type OTPFormValues = z.infer<typeof otpSchema>;

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email in URL, redirect to sign-in
      router.push("/sign-in");
    }
  }, [searchParams, router]);

  const handleOTPVerify = useCallback(
    async (data: OTPFormValues) => {
      if (!email) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await signIn.emailOtp({
          email: email,
          otp: data.otp,
        });

        if (result.error) {
          setError(result.error.message || "Invalid OTP code");
          setIsLoading(false);
          return;
        }

        // Success - redirect to home
        router.push("/");
        router.refresh();
      } catch {
        setError("An unexpected error occurred");
        setIsLoading(false);
      }
    },
    [email, router]
  );

  useEffect(() => {
    // Auto-submit when OTP is complete
    const subscription = form.watch((value) => {
      if (value.otp && value.otp.length === 6) {
        handleOTPVerify({ otp: value.otp });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, handleOTPVerify]);

  async function handleResendOTP() {
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      // Start cooldown timer
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Send OTP using the correct method
      const result = await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
      });

      if (result.error) {
        setError(result.error.message || "Failed to resend OTP");
        clearInterval(timer);
        setResendCooldown(0);
      }
    } catch {
      setError("Failed to resend OTP");
      setResendCooldown(0);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {email}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOTPVerify)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center block">
                      Verification Code
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isLoading}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} data-testid="otp-slot" />
                            <InputOTPSlot index={1} data-testid="otp-slot" />
                            <InputOTPSlot index={2} data-testid="otp-slot" />
                            <InputOTPSlot index={3} data-testid="otp-slot" />
                            <InputOTPSlot index={4} data-testid="otp-slot" />
                            <InputOTPSlot index={5} data-testid="otp-slot" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleResendOTP}
                  disabled={isLoading || resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend Code"}
                </Button>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || form.watch("otp")?.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the code? Check your spam folder or{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendCooldown > 0}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 disabled:opacity-50"
            >
              try again
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              ← Back to Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
