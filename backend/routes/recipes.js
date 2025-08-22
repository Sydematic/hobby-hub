import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Create typed recipe
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, image, category, area, instructions } = req.body;
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description: description || "",
        image: image || "",
        category: category || "",
        area: area || "",
        instructions: instructions || "",
        userId: req.user.id,
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Get typed recipes for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get recipes' });
  }
});

// Delete typed recipe
router.delete('/:id', authMiddleware, async (req, res) => {
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

export default router;
