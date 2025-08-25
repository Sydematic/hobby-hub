import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import authRoutes from "./routes/auth.js";
import hobbyRoutes from "./routes/hobbies.js";
import exerciseRoutes from "./routes/exerciseDB.js";
import recipeRoutes from "./routes/recipeRoutes.js"; // Main recipe routes
import mealdbRoutes from "./routes/mealdb.js";
import travelRoutes from "./routes/travelDB.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- Middleware ----------------
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---------------- Logging Middleware ----------------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body ? 'with body' : 'no body');
  next();
});

// ---------------- Mount Routers ----------------
app.use("/api/auth", authRoutes);
app.use("/api/hobbies", hobbyRoutes);  
app.use("/api/exercises", exerciseRoutes);
app.use("/api/recipes", recipeRoutes); // ✅ Main recipe routes
app.use("/api/external", mealdbRoutes);
app.use("/api/travel", travelRoutes);

// ---------------- Health Check ----------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
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
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

app.use("/api/recipes", recipeRoutes); // ✅ Main recipe routes
console.log("🔥 RECIPE ROUTES MOUNTED ON /api/recipes");