import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// Create hobby
router.post('/', authMiddleware, async (req, res) => {
  try {
    const hobby = await prisma.hobby.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id, // assuming req.user has `id`
      },
    });
    res.status(201).json(hobby);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create hobby' });
  }
});

// Get hobbies for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const hobbies = await prisma.hobby.findMany({
      where: { userId: req.user.id },
    });
    res.json(hobbies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get hobbies' });
  }
});

export default router;

