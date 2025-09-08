export const AUTH_CONFIG = {
    API_URL: "https://randomuser.me/api/?results=1&nat=us",
    PHONE_PATTERNS: [
        /^09\d{9}$/,
        /^\+989\d{9}$/,
        /^00989\d{9}$/,
    ],
    ERROR_MESSAGES: {
        INVALID_PHONE: "Invalid Iranian mobile number format",
        LOGIN_FAILED: "Failed to login. Please try again.",
        REQUIRED_PHONE:"Field is required"
    },
    STORAGE_KEY: "user",
} as const;