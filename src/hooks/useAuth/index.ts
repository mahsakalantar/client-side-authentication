"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {fetchUserData, saveUserData, logout as clearUserData,  getUserFromStorage} from "@/lib/auth"
import {UserData} from "@/lib/types";

export function useAuth() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: user, isLoading, isError, refetch } = useQuery<UserData, Error>({
        queryKey: ["user"],
        queryFn: async () => {
            const stored = getUserFromStorage()
            if (stored) return stored
            const fetched = await fetchUserData()
            saveUserData(fetched)
            return fetched
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    })

    const loginMutation = useMutation<UserData, Error, void>({
        mutationFn: async () => {
            const data = await fetchUserData()
            saveUserData(data)
            return data
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data)
            toast.success("Login Successful", { description: `Welcome, ${data.name}!` })
            router.push("/dashboard")
        },
        onError: () => toast.error("Login Failed", { description: "Unable to log in. Please try again." }),
    })

    const logout = () => {
        clearUserData()
        queryClient.removeQueries({ queryKey: ["user"], exact: true })
        toast.success("Logged Out", { description: "You have been successfully logged out." })
        router.push("/")
    }

    return { user, isLoading, isError, login: loginMutation.mutateAsync, refetchUser: refetch, logout }
}