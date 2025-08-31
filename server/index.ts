import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleTest } from "./routes/test";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Serve static files from public directory in development
  if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, "../../public")));
  }

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/demo", handleDemo);

  // Test API routes for all HTTP methods
  app.get("/api/test", handleTest);
  app.post("/api/test", handleTest);
  app.put("/api/test", handleTest);
  app.patch("/api/test", handleTest);
  app.delete("/api/test", handleTest);

  // SPA fallback - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      // In development, serve from root directory
      const indexPath = process.env.NODE_ENV === 'production' 
        ? path.join(__dirname, "../spa/index.html")
        : path.join(__dirname, "../../index.html");
      res.sendFile(indexPath);
    }
  });

  return app;
}
