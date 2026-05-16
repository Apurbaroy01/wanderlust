"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Spinner, TextField } from "@heroui/react";
import { Card } from '@heroui/react';
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const user = Object.fromEntries(formData);

            console.log("Login data:", user);

            // Validation
            if (!user.email || !user.password) {
                alert("Email and password are required");
                return;
            }

            const { data, error } = await authClient.signIn.email({
                email: user.email,
                password: user.password,

                options: {
                    autoLogin: true,
                },
                callbackURL: "/"
            });

            // Better-auth error handling
            if (error) {
                console.error("Login error:", error);

                switch (error.code) {
                    case "INVALID_EMAIL_OR_PASSWORD":
                        alert("Invalid email or password");
                        break;

                    case "USER_NOT_FOUND":
                        alert("User not found");
                        break;

                    case "EMAIL_NOT_VERIFIED":
                        alert("Please verify your email first");
                        break;

                    case "TOO_MANY_REQUESTS":
                        alert("Too many attempts. Try again later");
                        break;

                    default:
                        alert(error.message || "Login failed");
                }

                return;
            }

            console.log("Login successful:", data);

            alert("Login successful!");

            // redirect
            // router.push("/");

        } catch (err) {
            console.error("Unexpected error:", err);

            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex max-w-7xl min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6 ">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <Form className="flex w-96 flex-col gap-4" onSubmit={handleLogin}>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
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
                            // if (!/[A-Z]/.test(value)) {
                            //     return "Password must contain at least one uppercase letter";
                            // }
                            // if (!/[0-9]/.test(value)) {
                            //     return "Password must contain at least one number";
                            // }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex w-full gap-2">
                        <Button type="submit " className="flex w-full items-center gap-2" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <Check />
                                    Login
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
                <p className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;