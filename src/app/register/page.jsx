"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, Spinner, TextField } from "@heroui/react";
import { Card } from '@heroui/react';
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData);
        console.log("Registration data:", user);
        // Here you would typically send the registration data to your backend API

        const { data, error } = await authClient.signUp.email({
            name: user.name, // required
            email: user.email, // required
            password: user.password, // required
                options: {
                    autoLogin: true,
                },
        });
        if (error) {
            setLoading(false);
            console.error("Registration error:", error);
            alert("Registration failed: " + error.message);
        } else {
            setLoading(false);
            console.log("Registration successful:", data);
            alert("Registration successful! Please check your email to verify your account.");
        }
    }

    return (
        <div className="flex max-w-7xl min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6 ">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                <Form className="flex w-96 flex-col gap-4" onSubmit={handleRegister}>
                    <TextField
                        isRequired
                        name="name"
                        type="text"
                    >
                        <Label>Name</Label>
                        <Input placeholder="John Doe" />
                        <FieldError />
                    </TextField>

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
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Check />
                                    Submit
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
                <p className="text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default RegisterPage;