import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/external/recipes?search=...
router.get("/recipes", async (req, res) => {
  const { search = "" } = req.query;

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
    );

    const meals = response.data.meals || [];

    const formattedMeals = meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
    }));

    res.json({ recipes: formattedMeals });
  } catch (err) {
    console.error("Error fetching recipes:", err.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// GET /api/external/random
router.get("/random", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    const meal = response.data.meals?.[0];

    if (!meal) return res.json({ recipes: [] });

    const formattedMeal = {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
    };

    res.json({ recipes: [formattedMeal] });
  } catch (err) {
    console.error("Error fetching random recipe:", err.message);
    res.status(500).json({ error: "Failed to fetch random recipe" });
  }
});

export default router;
