// Form validation schemas using Zod
import { z } from "zod";

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["parent", "student", "counselor"]),
});

// Student validation schemas
export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(5).max(18, "Age must be between 5 and 18"),
  grade: z.string().min(1, "Grade is required"),
  parentId: z.string().min(1, "Parent ID is required"),
});

// Mood entry validation
export const moodEntrySchema = z.object({
  mood: z.number().min(1).max(5, "Mood must be between 1 and 5"),
  notes: z.string().optional(),
  factors: z.array(z.string()).optional(),
});

// Chat message validation
export const chatMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
  sessionId: z.string().min(1, "Session ID is required"),
});

// Risk assessment validation
export const riskAssessmentSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  score: z.number().min(0).max(10, "Risk score must be between 0 and 10"),
  level: z.enum(["low", "moderate", "high", "critical"]),
  factors: z.array(z.object({
    category: z.string(),
    severity: z.number().min(0).max(10),
    description: z.string(),
    evidence: z.array(z.string()),
  })),
  recommendations: z.array(z.string()),
});

// Crisis alert validation
export const crisisAlertSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  severity: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  immediateAction: z.boolean().default(false),
});

// Settings validation
export const settingsSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    sms: z.boolean().default(false),
  }),
  privacy: z.object({
    shareData: z.boolean().default(false),
    analytics: z.boolean().default(true),
  }),
  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]).default("system"),
    language: z.string().default("en"),
  }),
});

// Utility functions for validation
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { success: false, errors: ["Validation failed"] };
  }
};

export const getFieldError = (errors: z.ZodError, fieldName: string): string | undefined => {
  const error = errors.errors.find(err => err.path.includes(fieldName));
  return error?.message;
};

// Type exports for form data
export type LoginFormData = z.infer<typeof loginSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type StudentFormData = z.infer<typeof studentSchema>;
export type MoodEntryFormData = z.infer<typeof moodEntrySchema>;
export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;
export type RiskAssessmentFormData = z.infer<typeof riskAssessmentSchema>;
export type CrisisAlertFormData = z.infer<typeof crisisAlertSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
