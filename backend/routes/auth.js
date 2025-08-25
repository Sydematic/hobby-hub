import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// ---------------- Register ----------------
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { username, password: hashed },
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    await prisma.$disconnect();
  }
});

// ---------------- Login ----------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const userPayload = { id: user.id, username: user.username };

    const accessToken = jwt.sign(
      userPayload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Store refresh token in DB
    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id },
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  } finally {
    await prisma.$disconnect();
  }
});

// ---------------- Refresh Token ----------------
router.post('/refresh-token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!storedToken) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token verification failed' });

      const userPayload = { id: user.id, username: user.username };
      const accessToken = jwt.sign(
        userPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(500).json({ error: 'Could not refresh token' });
  } finally {
    await prisma.$disconnect();
  }
});

// ---------------- Logout ----------------
router.post('/logout', async (req, res) => {
  try {
    const { token } = req.body;
    await prisma.refreshToken.deleteMany({ where: { token } });
    res.sendStatus(204);
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
