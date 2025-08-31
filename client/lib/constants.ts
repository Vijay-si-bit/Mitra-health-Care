// Application constants
export const APP_NAME = "Mitra Mental Health";
export const APP_VERSION = "1.0.0";

// API endpoints
export const API_BASE_URL = "/api";

// Mental health risk levels
export const RISK_LEVELS = {
  LOW: { value: 0, label: "Low Risk", color: "green" },
  MODERATE: { value: 1, label: "Moderate Risk", color: "yellow" },
  HIGH: { value: 2, label: "High Risk", color: "orange" },
  CRITICAL: { value: 3, label: "Critical Risk", color: "red" }
} as const;

// Mood tracking options
export const MOOD_OPTIONS = [
  { value: 1, label: "Very Sad", emoji: "😢", color: "red" },
  { value: 2, label: "Sad", emoji: "😔", color: "orange" },
  { value: 3, label: "Neutral", emoji: "😐", color: "gray" },
  { value: 4, label: "Happy", emoji: "😊", color: "blue" },
  { value: 5, label: "Very Happy", emoji: "😄", color: "green" }
] as const;

// Navigation items
export const NAV_ITEMS = [
  { to: "/app/parent", label: "Parent Dashboard", icon: "LayoutDashboard" },
  { to: "/app/parent/risk", label: "Risk Analysis", icon: "AlertTriangle" },
  { to: "/app/student/chat", label: "Student Chat", icon: "MessageCircle" },
  { to: "/app/student/mood", label: "Mood Tracker", icon: "Heart" },
  { to: "/app/crisis", label: "Crisis Support", icon: "Phone" },
  { to: "/app/coaching", label: "Parent Coaching", icon: "Users" },
  { to: "/app/reports", label: "Analytics", icon: "TrendingUp" },
  { to: "/app/settings", label: "Settings", icon: "Settings" },
  { to: "/app/testimonials", label: "Testimonials", icon: "Star" }
] as const;

// Chart colors
export const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted))",
  brandBlue: "hsl(var(--brand-blue))",
  brandGreen: "hsl(var(--brand-green))",
  brandPurple: "hsl(var(--brand-purple))"
} as const;
