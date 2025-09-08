"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validatePhone = (value: string): boolean => {
        const patterns = [
            /^09\d{9}$/, // 09xxxxxxxxx
            /^\+989\d{9}$/, // +989xxxxxxxxx
            /^00989\d{9}$/, // 00989xxxxxxxxx
        ];
        return patterns.some((pattern) => pattern.test(value));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);
        if (value && !validatePhone(value)) {
            setError("Invalid Iranian mobile number format");
        } else {
            setError("");
        }
    };

    const handleLogin = async () => {
        if (!validatePhone(phone)) {
            setError("Invalid Iranian mobile number format");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
            const data = await response.json();
            const user = data.results[0];
            const userData = {
                name: `${user.name.first} ${user.name.last}`,
                email: user.email,
                picture: user.picture.medium,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            router.push("/dashboard");
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your Iranian mobile number</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Mobile Number
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                required
                                className={`appearance-none block w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                value={phone}
                                onChange={handleChange}
                                aria-invalid={error ? "true" : "false"}
                                aria-describedby={error ? "phone-error" : undefined}
                            />
                            {error && (
                                <p id="phone-error" className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button
                            type="button"
                            onClick={handleLogin}
                            disabled={!!error || !phone || loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}