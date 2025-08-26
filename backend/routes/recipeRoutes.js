// backend/routes/recipeRouter.js
import express from "express";
import prisma from "../client.js"; // <- make sure this exports new PrismaClient()

const router = express.Router();

// helper to get user from headers
async function getCurrentUser(req) {
  const userId = req.headers["x-user-id"];
    console.log("🔍 Received user ID from headers:", userId);
 if (!userId) {
    console.log("❌ No user ID found in headers");
    return null;
  }
console.log("✅ User authenticated with ID:", userId);
  return { id: userId }; // UUID from supabase auth.users
}


// TEST
router.get("/test", (req, res) => {
  res.json({ message: "Recipe routes are working!" });
});

// POST /api/recipes/typed - Save custom recipe
router.post("/typed", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    const { title, description, image, instructions } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: "Recipe title is required" });

    const recipe = await prisma.savedRecipe.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        image: image?.trim() || null,
        instructions: instructions?.trim() || null,
        source: "typed",
        userId: user.id, // matches schema
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("❌ Typed recipe error:", error);
    res.status(500).json({ error: "Failed to save recipe", details: error.message });
  }
});

// POST /api/recipes/saved - Save API recipe
router.post("/saved", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    const { title, description, image, category, area, instructions, source } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: "Recipe title is required" });

    const recipe = await prisma.savedRecipe.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        image: image?.trim() || null,
        category: category?.trim() || null,
        area: area?.trim() || null,
        instructions: instructions?.trim() || null,
        source: source?.trim() || "mealdb-search",
        userId: user.id,
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("❌ Save recipe error:", error);
    res.status(500).json({ error: "Failed to save recipe", details: error.message });
  }
});

// GET /api/recipes/saved - Get user's saved recipes
router.get("/saved", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    const recipes = await prisma.savedRecipe.findMany({
      where: {
        userId: user.id,
        ...(req.query.source ? { source: req.query.source } : {}),
      },
      orderBy: { id: "desc" }, // or created_at if you add it
    });

    res.json({ recipes });
  } catch (error) {
    console.error("❌ Get recipes error:", error);
    res.status(500).json({ error: "Failed to fetch recipes", details: error.message });
  }
});

// DELETE /api/recipes/:id - Delete recipe
router.delete("/:id", async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    await prisma.savedRecipe.deleteMany({
      where: {
        id: Number(req.params.id), // your SavedRecipe.id is Int
        userId: user.id,
      },
    });

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("❌ Delete recipe error:", error);
    res.status(500).json({ error: "Failed to delete recipe", details: error.message });
  }
});

export default router;
