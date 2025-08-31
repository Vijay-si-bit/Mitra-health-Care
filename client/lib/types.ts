// Common types for the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: "parent" | "student" | "counselor";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  parentId: string;
  riskScore: number;
  lastMoodEntry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoodEntry {
  id: string;
  studentId: string;
  mood: number; // 1-5 scale
  notes?: string;
  timestamp: Date;
  factors?: string[]; // Contributing factors
}

export interface RiskAssessment {
  id: string;
  studentId: string;
  score: number; // 0-10 scale
  level: "low" | "moderate" | "high" | "critical";
  factors: RiskFactor[];
  recommendations: string[];
  assessedAt: Date;
  assessedBy: string;
}

export interface RiskFactor {
  category: string;
  severity: number; // 0-10
  description: string;
  evidence: string[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: "student" | "ai" | "counselor";
  content: string;
  timestamp: Date;
  metadata?: {
    sentiment?: number;
    riskIndicators?: string[];
    followUpRequired?: boolean;
  };
}

export interface ChatSession {
  id: string;
  studentId: string;
  startedAt: Date;
  endedAt?: Date;
  messages: ChatMessage[];
  summary?: string;
  riskLevel?: "low" | "moderate" | "high" | "critical";
}

export interface Notification {
  id: string;
  userId: string;
  type: "info" | "warning" | "critical" | "success";
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface AnalyticsData {
  period: "day" | "week" | "month" | "year";
  moodTrends: MoodTrend[];
  riskTrends: RiskTrend[];
  engagementMetrics: EngagementMetrics;
  alerts: Alert[];
}

export interface MoodTrend {
  date: string;
  averageMood: number;
  entryCount: number;
}

export interface RiskTrend {
  date: string;
  riskScore: number;
  level: string;
}

export interface EngagementMetrics {
  chatSessions: number;
  moodEntries: number;
  averageSessionDuration: number;
  responseTime: number;
}

export interface Alert {
  id: string;
  type: "mood_decline" | "risk_increase" | "engagement_drop" | "crisis_indicator";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  studentId: string;
  triggeredAt: Date;
  acknowledged: boolean;
}

export interface CoachingResource {
  id: string;
  title: string;
  description: string;
  category: "communication" | "mental_health" | "crisis_management" | "general";
  type: "article" | "video" | "guide" | "checklist";
  url?: string;
  content?: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface CrisisContact {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email?: string;
  website?: string;
  available24x7: boolean;
  specialties: string[];
  location?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface MoodEntryForm {
  mood: number;
  notes?: string;
  factors?: string[];
}

export interface StudentRegistrationForm {
  name: string;
  age: number;
  grade: string;
  parentEmail: string;
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps extends ComponentProps {
  title?: string;
  description?: string;
}
