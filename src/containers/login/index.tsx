"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { AUTH_CONFIG } from "@/lib/constants";
import {loginSchema} from "@/containers/login/schema";
import {useAuth} from "@/hooks/useAuth";


type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { refetchUser } = useAuth()
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setFocus,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
        },
    });

    const onSubmit = async () => {
        try {
            await refetchUser()
            toast.success("Login Successful", {
                description: "Welcome!",
            });
            router.push("/dashboard");
        } catch (err) {
            toast.error("Login Failed", {
                description: AUTH_CONFIG.ERROR_MESSAGES.LOGIN_FAILED,
            });
            setFocus("phone");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-muted)] px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-[var(--color-foreground)]">Login</CardTitle>
                    <CardDescription className="mt-2 text-sm text-muted-foreground">
                        Enter your mobile number
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label
                                htmlFor="phone"
                                className="block text-sm font-medium text-[var(--color-foreground)]"
                            >
                                Mobile Number
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    {...register("phone")}
                                    className={errors.phone ? "border-destructive" : ""}
                                    aria-invalid={errors.phone ? "true" : "false"}
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                    placeholder="e.g., 09123456789 or +989123456789"
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="mt-2 text-sm text-destructive">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                            variant="default"
                        >
                            {isSubmitting ? "Loading..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    );
}