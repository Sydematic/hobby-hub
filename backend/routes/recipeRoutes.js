// backend/routes/recipeRoutes.js
import express from "express";
import supabase from "../supabaseClientBackend.js"; // Your existing file

const router = express.Router();

// Helper to get user from headers
async function getCurrentUser(req) {
  const userId = req.headers["x-user-id"];
  console.log("🔍 Received user ID from headers:", userId);
  
  if (!userId) {
    console.log("❌ No user ID found in headers");
    return null;
  }
  
  console.log("✅ User authenticated with ID:", userId);
  return { id: userId };
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

    console.log("💾 Creating custom recipe for user:", user.id);

    const { data, error } = await supabase
      .from('SavedRecipe')
      .insert([
        {
          title: title.trim(),
          description: description?.trim() || null,
          image: image?.trim() || null,
          instructions: instructions?.trim() || null,
          source: "typed",
          userId: user.id,
        }
      ])
      .select()

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: "Failed to save recipe", details: error.message });
    }

    console.log("✅ Custom recipe created successfully:", data[0].id);
    res.status(201).json(data[0]);
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

    console.log("💾 Saving API recipe for user:", user.id);

    const { data, error } = await supabase
      .from('SavedRecipe')
      .insert([
        {
          title: title.trim(),
          description: description?.trim() || null,
          image: image?.trim() || null,
          category: category?.trim() || null,
          area: area?.trim() || null,
          instructions: instructions?.trim() || null,
          source: source?.trim() || "mealdb-search",
          userId: user.id,
        }
      ])
      .select()

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: "Failed to save recipe", details: error.message });
    }

    console.log("✅ API recipe saved successfully:", data[0].id);
    res.status(201).json(data[0]);
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

    console.log("📋 Fetching recipes for user:", user.id, "source:", req.query.source);

    let query = supabase
      .from('SavedRecipe')
      .select('*')
      .eq('userId', user.id)
      .order('id', { ascending: false });

    if (req.query.source) {
      query = query.eq('source', req.query.source);
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: "Failed to fetch recipes", details: error.message });
    }

    console.log("✅ Found", data.length, "recipes for user");
    res.json({ recipes: data });
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

    console.log("🗑️ Deleting recipe", req.params.id, "for user:", user.id);

    const { error } = await supabase
      .from('SavedRecipe')
      .delete()
      .eq('id', Number(req.params.id))
      .eq('userId', user.id);

    if (error) {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: "Failed to delete recipe", details: error.message });
    }

    console.log("✅ Recipe deleted successfully");
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("❌ Delete recipe error:", error);
    res.status(500).json({ error: "Failed to delete recipe", details: error.message });
  }
});

export default router;