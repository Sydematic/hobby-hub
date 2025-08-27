// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

// Routers
import authRoutes from "./routes/auth.js";
import hobbyRoutes from "./routes/hobbies.js";
import exerciseRoutes from "./routes/exerciseDB.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import mealdbRoutes from "./routes/mealdb.js";
import travelRoutes from "./routes/travelDB.js";

// ---------------- Load ENV ----------------
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing in your .env");
  process.exit(1);
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error("❌ SUPABASE keys are missing in your .env");
  process.exit(1);
}

// ---------------- Prisma Setup ----------------
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

(async () => {
  try {
    const now = await prisma.$queryRaw`SELECT NOW()`;
    console.log("✅ Connected to Neon DB:", now);
  } catch (err) {
    console.error("❌ Prisma connection error:", err);
  }
})();

// ---------------- Express Setup ----------------
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173",
  "https://hobbyhub123.netlify.app",
  "https://hobby-hub-4nsj.onrender.com",
  "https://hobby-hub-1-prq1.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---------------- Logging Middleware ----------------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body ? "with body" : "no body");
  next();
});

// ---------------- Auth Middleware ----------------
import authMiddleware from "./middleware/authMiddleware.js";

// ---------------- Mount Routers ----------------
app.use("/api/auth", authRoutes);
app.use("/api/hobbies", hobbyRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/recipes", authMiddleware, recipeRoutes); // protected routes
app.use("/api/external", mealdbRoutes);
app.use("/api/travel", travelRoutes);

// ---------------- Health Check ----------------
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ---------------- Prisma Test Route ----------------
app.get("/api/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users });
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// ---------------- Serve Frontend ----------------
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => res.sendFile(path.join(frontendPath, "index.html")));

// ---------------- Global Error Handler ----------------
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack || err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
