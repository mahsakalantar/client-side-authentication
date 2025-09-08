import {z} from "zod";
import {validatePhoneNumber} from "@/lib/auth";
import {AUTH_CONFIG} from "@/lib/constants";

export const loginSchema = z.object({
    phone: z
        .string()
        .nonempty(AUTH_CONFIG.ERROR_MESSAGES.REQUIRED_PHONE)
        .refine(validatePhoneNumber, {
            message: AUTH_CONFIG.ERROR_MESSAGES.INVALID_PHONE,
        }),
})