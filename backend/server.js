import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import hobbyRoutes from "./routes/hobbies.js";
import exerciseRoutes from "./routes/exerciseDB.js";
import recipeRoutes from "./routes/recipeRoutes.js"; // ✅ one file handles recipes
import mealdbRoutes from "./routes/mealdb.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,
  })
);
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("Backend server is running!"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/hobbies", hobbyRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/recipes", recipeRoutes); // ✅ now everything recipes under /api/recipes
app.use("/api/external", mealdbRoutes); // external API proxy

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
