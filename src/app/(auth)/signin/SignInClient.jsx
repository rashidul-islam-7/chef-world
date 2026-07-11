"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import GoogleSignUpButton from "@/components/GoogleSignUpBtn";
import { signIn } from "@/lib/auth-client";

const SignInClient = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Validation
    if (!user.email?.trim()) {
      setIsLoading(false);
      return setError("Email is required!");
    }

    if (!user.password?.trim()) {
      setIsLoading(false);
      return setError("Password is required!");
    }

    if (user.password.length < 8) {
      setIsLoading(false);
      return setError("Password must be at least 8 characters!");
    }

    try {
      const { data, error } = await signIn.email({
        email: user.email,
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Invalid email or password");
        return;
      }

      setSuccess("Sign in successful!");
      router.push("/");
    } catch (err) {
      console.error(err);

      setError(err?.message || "Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-3xl shadow-lg">
            🍽️
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back Chef<span className="text-orange-500">World</span>
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue to your account
          </p>
        </div>

        {/* Google */}
        <GoogleSignUpButton />

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>

          <span className="mx-4 text-xs font-medium uppercase text-gray-400">
            or
          </span>

          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-600 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
            {success}
          </div>
        )}

        {/* Form */}
        <Form onSubmit={onSubmit} className="space-y-5">
          <TextField isRequired name="email" type="email">
            <Label className="dark:text-gray-300">Email Address</Label>
            <Input
              placeholder="john@example.com"
              className="w-full rounded-xl dark:bg-gray-700 py-0 "
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <Label className="dark:text-gray-300">Password</Label>

            <InputGroup className="w-full rounded-xl dark:bg-gray-700 ">
              <InputGroup.Input
                name="password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <InputGroup.Suffix>
                <Button
                  type="button"
                  isIconOnly
                  variant="light"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <IoMdEye className="text-lg" />
                  ) : (
                    <IoMdEyeOff className="text-lg" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

            <Description>
              Password must contain at least 8 characters.
            </Description>

            <FieldError />
          </TextField>

          <Button
            type="submit"
            isLoading={isLoading}
            className="cursor-pointer mt-2 h-10 w-full rounded-full text-base bg-blue-600 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInClient;
