import React from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Auth Form */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Mitra</span>
          </div>
          
          {/* Auth Form Content */}
          {children}
          
          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image/Content */}
      <div className="hidden lg:block relative bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Supporting Mental Health Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of families using AI-powered tools to support student mental health and well-being.
            </p>
            
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">24/7 AI-powered support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time risk assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Parent coaching resources</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Crisis intervention support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/5 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/10 rounded-full"></div>
      </div>
    </div>
  );
}
