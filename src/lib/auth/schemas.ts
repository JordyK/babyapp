import { z } from 'zod';

/**
 * Authentication validation schemas
 * 
 * These schemas provide type-safe validation for all authentication forms
 * following the project's calm and trustworthy design principles.
 */

/**
 * Email validation schema
 */
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long');

/**
 * Password validation schema
 * Requirements: 8+ chars, at least 1 letter, 1 number
 */
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)/,
    'Password must contain at least 1 letter and 1 number'
  );

/**
 * Name validation schema
 */
const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

/**
 * Sign up form schema
 */
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

/**
 * Sign in form schema
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

/**
 * Password reset request schema
 */
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

/**
 * Password reset confirmation schema
 */
export const passwordResetSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  dueDate: z.string().optional().refine((date) => {
    if (!date) return true;
    const parsed = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isNaN(parsed.getTime()) && parsed >= today;
  }, {
    message: 'Due date must be today or in the future',
  }),
});

/**
 * Type inference from schemas
 */
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type PasswordResetRequestFormData = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
