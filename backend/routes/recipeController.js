import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all typed (custom) recipes
export const getTypedRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

// Create new typed recipe
export const createTypedRecipe = async (req, res) => {
  try {
    const { title, description, image, instructions, userId } = req.body;
    const recipe = await prisma.recipe.create({
      data: { title, description, image, instructions, userId },
    });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create recipe" });
  }
};

// Delete typed recipe
export const deleteTypedRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.recipe.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};

// Saved API recipes
export const getSavedRecipes = async (req, res) => {
  try {
    const saved = await prisma.savedRecipe.findMany({
      orderBy: { id: "desc" },
    });
    res.json({ recipes: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
};

export const saveAPIRecipe = async (req, res) => {
  try {
    const { title, description, image, category, area, instructions, source, userId } = req.body;
    const saved = await prisma.savedRecipe.create({
      data: { title, description, image, category, area, instructions, source, userId },
    });
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save API recipe" });
  }
};

// Delete saved API recipe
export const deleteSavedRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.savedRecipe.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Saved recipe deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete saved recipe" });
  }
};
