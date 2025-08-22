import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import hobbyRoutes from "./routes/hobbies.js";
import exerciseRoutes from "./routes/exerciseDB.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import mealdbRoutes from "./routes/mealdb.js";

dotenv.config();
const app = express();

// Needed for ES modules to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/hobbies", hobbyRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/external", mealdbRoutes);

// Serve frontend build files
// Updated path for Render: remove "../" since backend is the root directory
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Serve index.html for all other routes (React Router support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
