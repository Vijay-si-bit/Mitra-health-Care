// Next.js-style route definitions
import { lazy } from "react";

// Lazy load components for better performance
const Landing = lazy(() => import("../pages/mitra/Landing"));
const ParentDashboard = lazy(() => import("../pages/mitra/ParentDashboard"));
const RiskAnalysis = lazy(() => import("../pages/mitra/RiskAnalysis"));
const StudentChat = lazy(() => import("../pages/mitra/StudentChat"));
const StudentMoodTracker = lazy(() => import("../pages/mitra/StudentMoodTracker"));
const CrisisSupport = lazy(() => import("../pages/mitra/CrisisSupport"));
const ParentCoaching = lazy(() => import("../pages/mitra/ParentCoaching"));
const AnalyticsReports = lazy(() => import("../pages/mitra/AnalyticsReports"));
const SettingsPrivacy = lazy(() => import("../pages/mitra/SettingsPrivacy"));
const Testimonials = lazy(() => import("../pages/mitra/Testimonials"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Route configuration following Next.js patterns
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  layout?: "app" | "auth" | "public";
  title?: string;
  description?: string;
  protected?: boolean;
  roles?: string[];
}

export const routes: RouteConfig[] = [
  // Public routes
  {
    path: "/",
    component: Landing,
    layout: "public",
    title: "Mitra - Mental Health Support",
    description: "AI-powered mental health platform for students and parents"
  },

  // App routes (protected)
  {
    path: "/app",
    component: ParentDashboard,
    layout: "app",
    title: "Dashboard",
    description: "Parent dashboard overview",
    protected: true,
    roles: ["parent", "admin"]
  },
  {
    path: "/app/parent",
    component: ParentDashboard,
    layout: "app",
    title: "Parent Dashboard",
    description: "Monitor your child's mental health",
    protected: true,
    roles: ["parent", "admin"]
  },
  {
    path: "/app/parent/risk",
    component: RiskAnalysis,
    layout: "app",
    title: "Risk Analysis",
    description: "Detailed risk assessment and analysis",
    protected: true,
    roles: ["parent", "admin"]
  },
  {
    path: "/app/student/chat",
    component: StudentChat,
    layout: "app",
    title: "AI Chat Support",
    description: "Chat with AI counselor",
    protected: true,
    roles: ["student", "parent", "admin"]
  },
  {
    path: "/app/student/mood",
    component: StudentMoodTracker,
    layout: "app",
    title: "Mood Tracker",
    description: "Track daily mood and feelings",
    protected: true,
    roles: ["student", "parent", "admin"]
  },
  {
    path: "/app/crisis",
    component: CrisisSupport,
    layout: "app",
    title: "Crisis Support",
    description: "Emergency mental health resources",
    protected: true
  },
  {
    path: "/app/coaching",
    component: ParentCoaching,
    layout: "app",
    title: "Parent Coaching",
    description: "Resources and guidance for parents",
    protected: true,
    roles: ["parent", "admin"]
  },
  {
    path: "/app/reports",
    component: AnalyticsReports,
    layout: "app",
    title: "Analytics & Reports",
    description: "Detailed analytics and progress reports",
    protected: true,
    roles: ["parent", "admin"]
  },
  {
    path: "/app/settings",
    component: SettingsPrivacy,
    layout: "app",
    title: "Settings & Privacy",
    description: "Manage account settings and privacy",
    protected: true
  },
  {
    path: "/app/testimonials",
    component: Testimonials,
    layout: "app",
    title: "Success Stories",
    description: "Read testimonials from other families",
    protected: true
  },

  // 404 route
  {
    path: "*",
    component: NotFound,
    layout: "public",
    title: "Page Not Found"
  }
];

// Helper functions for route management
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter(route => route.protected);
};

export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter(route => !route.protected);
};

export const getRoutesByLayout = (layout: string): RouteConfig[] => {
  return routes.filter(route => route.layout === layout);
};
