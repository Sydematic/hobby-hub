// backend/routes/recipeRoutes.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ---------------- HELPER ----------------
async function getOrCreateUser(supabaseUser) {
  if (!supabaseUser?.id || !supabaseUser?.email) throw new Error("Invalid user info");

  return prisma.user.upsert({
    where: { id: supabaseUser.id },
    update: { email: supabaseUser.email, updated_at: new Date() },
    create: { id: supabaseUser.id, email: supabaseUser.email, password: "from-supabase" },
  });
}

// ---------------- TEST ----------------
router.get("/test", (req, res) => {
  res.json({ message: "Recipe routes are working!" });
});

// ---------------- POST /typed ----------------
router.post("/typed", async (req, res) => {
  try {
    const supabaseUser = req.user; // must be set from frontend session
    if (!supabaseUser) return res.status(401).json({ error: "Authentication required" });

    // ✅ Ensure user exists in Neon
    const user = await getOrCreateUser(supabaseUser);

    const { title, description, image, instructions } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: "Recipe title is required" });

    const recipe = await prisma.savedRecipe.create({
      data: {
        title: title.trim(),
        description: description?.trim() || "",
        image: image?.trim() || "",
        instructions: instructions?.trim() || "",
        source: "typed",
        userId: user.id,
      },
    });

    console.log("✅ Typed recipe created:", recipe);
    res.status(201).json(recipe);
  } catch (error) {
    console.error("❌ Typed recipe error:", error);
    res.status(500).json({ error: "Failed to save typed recipe", details: error.message });
  }
});

// ---------------- POST /saved ----------------
router.post("/saved", async (req, res) => {
  try {
    const supabaseUser = req.user;
    if (!supabaseUser) return res.status(401).json({ error: "Authentication required" });

    const user = await getOrCreateUser(supabaseUser);

    const { title, description, image, category, area, instructions, source } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: "Recipe title is required" });

    const recipe = await prisma.savedRecipe.create({
      data: {
        title: title.trim(),
        description: description?.trim() || "",
        image: image?.trim() || "",
        category: category?.trim() || "",
        area: area?.trim() || "",
        instructions: instructions?.trim() || "",
        source: source?.trim() || "mealdb-search",
        userId: user.id,
      },
    });

    console.log("✅ Saved recipe created:", recipe);
    res.status(201).json(recipe);
  } catch (error) {
    console.error("❌ Save recipe error:", error);
    res.status(500).json({ error: "Failed to save recipe", details: error.message });
  }
});

// ---------------- GET /saved ----------------
router.get("/saved", async (req, res) => {
  try {
    const supabaseUser = req.user;
    if (!supabaseUser) return res.status(401).json({ error: "Authentication required" });

    const user = await getOrCreateUser(supabaseUser);

    const query = {
      where: { userId: user.id },
      orderBy: { id: "desc" },
    };
    if (req.query.source) query.where.source = req.query.source;

    const recipes = await prisma.savedRecipe.findMany(query);

    console.log("✅ Found recipes:", recipes.length, "for user:", user.id);
    res.json({ recipes });
  } catch (error) {
    console.error("❌ Get saved recipes error:", error);
    res.status(500).json({ error: "Failed to fetch recipes", details: error.message });
  }
});

// ---------------- DELETE /:id ----------------
router.delete("/:id", async (req, res) => {
  try {
    const supabaseUser = req.user;
    if (!supabaseUser) return res.status(401).json({ error: "Authentication required" });

    const user = await getOrCreateUser(supabaseUser);

    const deleted = await prisma.savedRecipe.deleteMany({
      where: { id: req.params.id, userId: user.id },
    });

    console.log("✅ Deleted recipes count:", deleted.count);
    res.json({ message: "Recipe deleted successfully", deletedCount: deleted.count });
  } catch (error) {
    console.error("❌ Delete recipe error:", error);
    res.status(500).json({ error: "Failed to delete recipe", details: error.message });
  }
});

export default router;
