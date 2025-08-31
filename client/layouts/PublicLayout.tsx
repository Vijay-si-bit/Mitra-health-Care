import React from "react";
import { Link } from "react-router-dom";
import { Brain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Contact", href: "/contact" },
];

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Mitra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="ghost" asChild>
                    <Link to="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="font-bold">Mitra</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered mental health support platform for students and families.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm">
                <Link to="/features" className="block text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link to="/pricing" className="block text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
                <Link to="/testimonials" className="block text-muted-foreground hover:text-foreground">
                  Testimonials
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="/help" className="block text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
                <Link to="/crisis" className="block text-muted-foreground hover:text-foreground">
                  Crisis Support
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link to="/privacy" className="block text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Mitra Mental Health Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
