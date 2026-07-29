import { z } from "zod";

/**
 * ============================================================================
 * Authentication Validation Schemas
 * ============================================================================
 *
 * This module contains all authentication-related validation schemas.
 *
 * Used by:
 * - React Hook Form
 * - @hookform/resolvers/zod
 *
 * ============================================================================
 */

/**
 * Password Rules
 *
 * - Minimum 8 characters
 * - Maximum 32 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */

export const passwordSchema = z
  .string({
    required_error: "Password is required."
  })
  .trim()
  .min(8, "Password must be at least 8 characters.")
  .max(32, "Password must not exceed 32 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[!@#$%^&*()_\-+=<>?/{}[\]|\\:;"',.~`]/,
    "Password must contain at least one special character."
  );

/**
 * Email Validation
 */

export const emailSchema = z
  .string({
    required_error: "Email address is required."
  })
  .trim()
  .email("Please enter a valid email address.")
  .max(100, "Email must not exceed 100 characters.");

/**
 * Login Schema
 */

export const loginSchema = z.object({
  email: emailSchema,

  password: passwordSchema,

  rememberMe: z.boolean().optional().default(false)
});

/**
 * Login Form Default Values
 */

export const loginDefaultValues = {
  email: "",
  password: "",
  rememberMe: false
};

/**
 * Type-safe field names
 */

export const LOGIN_FIELDS = Object.freeze({
  EMAIL: "email",
  PASSWORD: "password",
  REMEMBER_ME: "rememberMe"
});

/**
 * Helper validation
 */

export const validateLogin = (values) => {
  return loginSchema.safeParse(values);
};

export default loginSchema;