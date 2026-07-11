"use client";

import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";
import GoogleSignUpButton from "@/components/GoogleSignUpBtn";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

const SignUpClient = () => {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // client side validation
    if (!user.name?.trim()) {
      setIsLoading(false);
      return setError("Name is required!");
    }

    if (!user.email?.trim()) {
      setIsLoading(false);
      return setError("Email is required!");
    }

    if (user.password.length < 6) {
      setIsLoading(false);
      return setError("Password must be at least 8 characters!");
    }

    try {
      setIsLoading(true);
      const { data, error } = await signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        router.push("/");
      }

      setSuccess("Account created successfully!");
    } catch (err) {
      setError(err?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-b from-orange-500 via-red-500 to-pink-500 text-3xl shadow-lg">
            🍽️
          </div>

          <h1 className="text-3xl font-extrabold dark:text-white ">
            Welcome to Chef<span className="text-orange-500">World</span>
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your account to discover, share, and save delicious recipes.
          </p>
        </div>

        {/* Google Sign Up */}
        <GoogleSignUpButton></GoogleSignUpButton>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>

          <span className="mx-4 text-xs font-medium uppercase text-gray-400">
            or
          </span>

          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
          <TextField isRequired name="name" type="text">
            <Label className="dark:text-gray-300">Username</Label>
            <Input
              className="w-full rounded-xl dark:bg-gray-700 py-0 shadow border-none"
              aria-label="Name"
              placeholder="John Doe"
            />
          </TextField>

          <TextField isRequired name="email" type="email">
            <Label className="dark:text-gray-300">Email</Label>
            <Input
              className="w-full rounded-xl dark:bg-gray-700 py-0 shadow border-none"
              placeholder="john@example.com"
            />
            <FieldError />
          </TextField>

          {/* image */}
          <TextField name="image" type="url" className="w-full ">
            <Label className="dark:text-gray-300" htmlFor="image">
              Image URL
            </Label>

            <Input
              id="image"
              className="w-full rounded-xl dark:bg-gray-700 shadow border-none"
              placeholder="https://example.com/image.jpg"
            />

            <FieldError>Please enter a valid image URL</FieldError>
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="dark:text-gray-300">Password</Label>
            <InputGroup className="w-full rounded-xl dark:bg-gray-700 py-0 shadow border-none">
              <InputGroup.Input
                name="password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g Rashed$134"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <IoMdEye className="size-4" />
                  ) : (
                    <IoMdEyeOff className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <Description>At least 8 characters</Description>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="cursor-pointer mt-2 h-10 w-full rounded-full text-base bg-blue-600 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? "Creating account..." : "Create an account"}
          </Button>
        </Form>

        {/* Footer */}
        <div className="mt-6 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-blue-400 transition hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpClient;
