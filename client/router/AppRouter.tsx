import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Layout components mapping
const layoutComponents = {
  app: AppLayout,
  public: PublicLayout,
  auth: AuthLayout,
};

// Route protection wrapper
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  // TODO: Implement actual authentication logic
  const isAuthenticated = true; // Replace with actual auth check
  const userRole = "parent"; // Replace with actual user role

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}

// Loading fallback component
function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function AppRouter() {
  const landingRoute = routes.find(r => r.path === "/");
  const dashboardRoute = routes.find(r => r.path === "/app");
  const notFoundRoute = routes.find(r => r.path === "*");

  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <PublicLayout>
              {landingRoute && <landingRoute.component />}
            </PublicLayout>
          } />
          
          {/* App routes with nested structure */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={
              <ProtectedRoute>
                {dashboardRoute && <dashboardRoute.component />}
              </ProtectedRoute>
            } />
            
            {routes
              .filter(route => route.path.startsWith("/app/"))
              .map((route) => {
                const Component = route.component;
                const relativePath = route.path.replace("/app/", "");
                
                return (
                  <Route
                    key={route.path}
                    path={relativePath}
                    element={
                      route.protected ? (
                        <ProtectedRoute requiredRoles={route.roles}>
                          <Component />
                        </ProtectedRoute>
                      ) : <Component />
                    }
                  />
                );
              })}
          </Route>

          {/* 404 route */}
          <Route path="*" element={
            <PublicLayout>
              {notFoundRoute && <notFoundRoute.component />}
            </PublicLayout>
          } />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
