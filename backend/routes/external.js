import express from "express";
import fetch from "node-fetch"; // or global fetch in Node 18+

const router = express.Router();

// Search meals by query
router.get("/recipes", async (req, res) => {
  const { search } = req.query;
  if (!search) return res.json({ recipes: [] });

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
    );
    const data = await response.json();
    res.json({ recipes: data.meals || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from MealDB" });
  }
});

// Single random meal - FIXED: Return 'meals' not 'recipes'
router.get("/random", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await response.json();
    res.json({ meals: data.meals || [] }); // FIXED: Return 'meals' to match frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch random meal" });
  }
});

// 🔹 Fetch 10 random meals in parallel - FIXED: Return 'meals' not 'recipes'
router.get("/random-multiple", async (req, res) => {
  try {
    const promises = Array.from({ length: 10 }, () =>
      fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((r) => r.json())
        .then((data) => data.meals[0])
        .catch((err) => {
          console.error("Failed fetch:", err);
          return null; // continue even if one fails
        })
    );

    const meals = await Promise.all(promises);
    res.json({ meals: meals.filter(Boolean) }); // FIXED: Return 'meals' to match frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch random meals" });
  }
});

export default router;