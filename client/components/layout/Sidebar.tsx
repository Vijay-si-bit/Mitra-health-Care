import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  AlertTriangle,
  MessageCircle,
  Heart,
  Phone,
  Users,
  TrendingUp,
  Settings,
  Star,
  Brain
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/app/parent", icon: LayoutDashboard },
  { name: "Risk Analysis", href: "/app/parent/risk", icon: AlertTriangle },
  { name: "Student Chat", href: "/app/student/chat", icon: MessageCircle },
  { name: "Mood Tracker", href: "/app/student/mood", icon: Heart },
  { name: "Crisis Support", href: "/app/crisis", icon: Phone },
  { name: "Parent Coaching", href: "/app/coaching", icon: Users },
  { name: "Analytics", href: "/app/reports", icon: TrendingUp },
  { name: "Settings", href: "/app/settings", icon: Settings },
  { name: "Testimonials", href: "/app/testimonials", icon: Star },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-background border-r", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Mitra</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          Mitra Mental Health Platform
        </div>
      </div>
    </div>
  );
}
