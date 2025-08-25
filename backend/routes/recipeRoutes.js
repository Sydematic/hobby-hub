console.log("🔥 RECIPE ROUTES LOADING...");

import express from "express";
import supabase from "../supabaseClientBackend.js";

console.log("🔥 RECIPE ROUTES IMPORTS SUCCESSFUL");

const router = express.Router();

console.log("🔥 RECIPE ROUTES CREATED");

// Get current user from headers
async function getCurrentUser(req) {
  const userId = req.headers["x-user-id"];
  console.log("🔍 Getting user from headers, userId:", userId);
  if (!userId) {
    console.log("❌ No userId in headers");
    return null;
  }
  console.log("✅ User found:", userId);
  return { id: userId };
}

// Test route to verify routes are working
router.get("/test", (req, res) => {
  console.log("🔥 TEST ROUTE HIT!");
  res.json({ message: "Recipe routes are working!" });
});

// POST /api/recipes/typed - Save custom recipe
router.post("/typed", async (req, res) => {
  console.log("🔥 POST /typed route hit!");
  console.log("📝 Request body:", req.body);
  console.log("📝 Request headers:", req.headers["x-user-id"]);
  
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      console.log("❌ No user found, returning 401");
      return res.status(401).json({ error: "Authentication required" });
    }

    const { title, description, image, instructions } = req.body;
    if (!title?.trim()) {
      console.log("❌ No title provided");
      return res.status(400).json({ error: "Recipe title is required" });
    }

    console.log("🔄 Attempting to save to Supabase...");
    
    const { data, error } = await supabase
      .from('SavedRecipe')
      .insert([{
        title: title.trim(),
        description: (description || "").trim(),
        image: (image || "").trim(),
        instructions: (instructions || "").trim(),
        source: "typed",
        user_id: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }
    
    console.log("✅ Recipe saved successfully:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Typed recipe error:", error);
    res.status(500).json({ error: "Failed to save recipe", details: error.message });
  }
});

// POST /api/recipes/saved - Save API recipe
router.post("/saved", async (req, res) => {
  console.log("🔥 POST /saved route hit!");
  console.log("📝 Request body:", req.body);
  console.log("📝 Request headers:", req.headers["x-user-id"]);
  
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      console.log("❌ No user found, returning 401");
      return res.status(401).json({ error: "Authentication required" });
    }

    const { title, description, image, category, area, instructions, source } = req.body;
    if (!title?.trim()) {
      console.log("❌ No title provided");
      return res.status(400).json({ error: "Recipe title is required" });
    }

    console.log("🔄 Attempting to save to Supabase...");

    const { data, error } = await supabase
      .from('SavedRecipe')
      .insert([{
        title: title.trim(),
        description: (description || "").trim(),
        image: (image || "").trim(),
        category: (category || "").trim(),
        area: (area || "").trim(),
        instructions: (instructions || "").trim(),
        source: (source || "mealdb-search").trim(),
        user_id: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }
    
    console.log("✅ Recipe saved successfully:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Save recipe error:", error);
    res.status(500).json({ error: "Failed to save recipe", details: error.message });
  }
});

// GET /api/recipes/saved - Get user's saved recipes
router.get("/saved", async (req, res) => {
  console.log("🔥 GET /saved route hit!");
  console.log("📝 Query params:", req.query);
  console.log("📝 Request headers:", req.headers["x-user-id"]);
  
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      console.log("❌ No user found, returning 401");
      return res.status(401).json({ error: "Authentication required" });
    }

    console.log("🔄 Fetching from Supabase...");

    let query = supabase
      .from('SavedRecipe')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (req.query.source) {
      console.log("📝 Filtering by source:", req.query.source);
      query = query.eq('source', req.query.source);
    }

    const { data, error } = await query;
    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    console.log("✅ Recipes fetched successfully:", data?.length || 0, "recipes");
    res.json({ recipes: data || [] });
  } catch (error) {
    console.error("❌ Get recipes error:", error);
    res.status(500).json({ error: "Failed to fetch recipes", details: error.message });
  }
});

// DELETE /api/recipes/:id - Delete recipe
router.delete("/:id", async (req, res) => {
  console.log("🔥 DELETE /:id route hit!");
  console.log("📝 Recipe ID:", req.params.id);
  console.log("📝 Request headers:", req.headers["x-user-id"]);
  
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      console.log("❌ No user found, returning 401");
      return res.status(401).json({ error: "Authentication required" });
    }

    console.log("🔄 Deleting from Supabase...");

    const { data, error } = await supabase
      .from('SavedRecipe')
      .delete()
      .eq('id', parseInt(req.params.id))
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }
    
    console.log("✅ Recipe deleted successfully");
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("❌ Delete recipe error:", error);
    res.status(500).json({ error: "Failed to delete recipe", details: error.message });
  }
});

console.log("🔥 RECIPE ROUTES EXPORTED");

export default router;