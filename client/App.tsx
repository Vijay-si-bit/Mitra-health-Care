import "./global.css";

import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AppRouter from "@/router/AppRouter";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AppRouter />
          <Toaster />
          <Sonner />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

declare global {
  interface Window {
    __mitra_root__?: Root;
  }
}

const container = document.getElementById("root")!;
if (!window.__mitra_root__) {
  window.__mitra_root__ = createRoot(container);
}
window.__mitra_root__!.render(<App />);
