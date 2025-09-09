import { AUTH_CONFIG } from "@/lib/constants"
import {UserData} from "@/lib/types";

export const validatePhoneNumber = (phone: string): boolean => {
    return AUTH_CONFIG.PHONE_PATTERNS.some((pattern) => pattern.test(phone))
}

export const fetchUserData = async (): Promise<UserData> => {
    const response = await fetch(AUTH_CONFIG.API_URL)
    if (!response.ok) {
        throw new Error("Failed to fetch user data")
    }
    const data = await response.json()
    const user = data.results[0]
    return {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.medium,
    }
}

export const saveUserData = (userData: UserData): void => {
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, JSON.stringify(userData))
}

export const logout = (): void => {
    localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY)
}
export const getUserFromStorage = (): UserData | null => {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY)
    if (!raw) return null
    try {
        return JSON.parse(raw) as UserData
    } catch {
        return null
    }
}