
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password Requirements
  const passwordRules = [
    {
      label: "Must have an uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Must have a lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Must be at least 6 characters",
      valid: password.length >= 6,
    },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.valid);

  // Email Signup
  const handleEmailSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Password Validation
    if (!isPasswordValid) {
      toast.error("Please fulfill all password requirements.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      image: string;
    };

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        ...user,
      });

      if (error) {
        toast.error(error.message || "Error signing up!");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Signup
  const handlegooleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google signup failed!");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto my-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSubmit}>
            <FieldGroup>
              <Field>
                <Button
                  onClick={handlegooleSignUp}
                  variant="outline"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image-url">Image URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                {/* Password Requirements */}
                <div className="mt-2 space-y-2">
                  {passwordRules.map((rule) => (
                    <div
                      key={rule.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      {rule.valid ? (
                        <CheckCircle2
                          size={14}
                          className="text-green-600"
                        />
                      ) : (
                        <XCircle
                          size={14}
                          className="text-red-500"
                        />
                      )}

                      <span
                        className={
                          rule.valid
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
