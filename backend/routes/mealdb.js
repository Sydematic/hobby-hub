import express from "express";
import axios from "axios";

const router = express.Router();

// Search recipes
router.get("/recipes", async (req, res) => {
  const { search } = req.query;
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search || ""}`
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
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Fetch random recipe
router.get("/random", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const meal = response.data.meals[0];
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
    console.error(err);
    res.status(500).json({ error: "Failed to fetch random recipe" });
  }
});

export default router;

