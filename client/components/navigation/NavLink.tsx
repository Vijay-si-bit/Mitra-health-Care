import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

export default function NavLink({ 
  to, 
  children, 
  className, 
  activeClassName = "bg-primary text-primary-foreground",
  exact = false 
}: NavLinkProps) {
  const location = useLocation();
  
  const isActive = exact 
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isActive && activeClassName,
        className
      )}
    >
      {children}
    </Link>
  );
}
