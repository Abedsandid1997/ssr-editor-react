"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuth } from "../AuthContext";
import { url } from "@/utilits";
import apiClient from "../services/api-client";

const signInValidation = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInValidation>;

export default function SignInForm() {
  const { setAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectUrl = searchParams.get("redirect") || "/";
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInValidation),
  });

  const onSubmit = async (data: SignInFormData) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        setError("Something went wrong");
      } else {
        router.push(redirectUrl);
        setAuthenticated(true);
      }
      // const res = await apiClient.post("/auth/signin", data);

      // if (res.status === 200) {
      //   router.push(redirectUrl);
      //   setAuthenticated(true);
      // } else {
      //   setError(res.data?.message || "Something went wrong");
      // }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
          {error && (
            <Callout.Root color="red" className="mt-4">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <Button type="submit" className="!w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
