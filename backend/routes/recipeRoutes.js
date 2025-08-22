import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Helper function to get or create dummy user
async function getDummyUser() {
  try {
    // Try to find existing dummy user
    let user = await prisma.user.findFirst({
      where: { username: 'dummy_user' }
    });
    
    // If no dummy user exists, create one
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: 'dummy_user',
          password: 'dummy_password' // This won't be used for login
        }
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error with dummy user:', error);
    return null;
  }
}

// Create typed recipe
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const dummyUser = await getDummyUser();

    const recipe = await prisma.recipe.create({
      data: {
        title,
        userId: dummyUser.id, // Use dummy user ID
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Save API/MealDB recipe - FIXED: Connect to dummy user
router.post('/save', async (req, res) => {
  try {
    const { title, description, image, category, area, instructions } = req.body;
    const dummyUser = await getDummyUser();

    const savedRecipe = await prisma.savedRecipe.create({
      data: {
        title,
        description: description || "",
        image: image || "",
        category: category || "",
        area: area || "",
        instructions: instructions || "",
        userId: dummyUser.id, // Use dummy user ID
      },
    });

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save API recipe' });
  }
});

// Get typed/custom recipes
router.get('/saved', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: { id: 'desc' },
    });
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});

// Get saved API/MealDB recipes
router.get('/saved/api', async (req, res) => {
  try {
    const recipes = await prisma.savedRecipe.findMany({
      orderBy: { id: 'desc' },
    });
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch saved API recipes' });
  }
});

// Delete typed/custom recipe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.recipe.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Delete saved API recipe
router.delete('/saved/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.savedRecipe.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Saved API recipe deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete saved API recipe' });
  }
});

export default router;