import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routers
import authRoutes from "./routes/auth.js";
import hobbyRoutes from "./routes/hobbies.js";
import exerciseRoutes from "./routes/exerciseDB.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import mealdbRoutes from "./routes/mealdb.js";
import travelRoutes from "./routes/travelDB.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------- Middleware --------------------

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// -------------------- Router Mount Helper --------------------
const mountRouter = (routePath, router, name) => {
  try {
    app.use(routePath, router);
    console.log(`✅ ${name} mounted at ${routePath}`);
  } catch (err) {
    console.error(`❌ Failed to mount ${name}:`, err.message);
  }
};

// -------------------- Mount Routers --------------------
mountRouter("/api/auth", authRoutes, "authRoutes");
mountRouter("/api/hobbies", hobbyRoutes, "hobbyRoutes");
mountRouter("/api/exercises", exerciseRoutes, "exerciseRoutes");
mountRouter("/api/recipes", recipeRoutes, "recipeRoutes");
mountRouter("/api/external", mealdbRoutes, "mealdbRoutes");
mountRouter("/api/travel", travelRoutes, "travelRoutes");

// -------------------- Serve Frontend --------------------
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ error: "Server error" });
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
