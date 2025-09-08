"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import {useAuth} from "@/hooks/useAuth";


export default function DashboardPage() {
    const { user, isLoading } = useAuth()

    if (isLoading || !user) return <p className="text-center mt-12">Loading...</p>

    return (
        <Card className="max-w-lg mx-auto w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-[var(--color-foreground)]">
                    Welcome, {user.name}!
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 text-center">
                <Image
                    width={96}
                    height={96}
                    src={user.picture}
                    alt="Profile picture"
                    className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full"
                />
                <p className="text-sm sm:text-base text-muted-foreground">
                    You are logged in as <strong>{user.email}</strong>
                </p>
            </CardContent>
        </Card>
    )
}