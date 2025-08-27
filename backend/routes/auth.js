import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// ---------------- Register ----------------
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already taken' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed },
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ---------------- Login ----------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const userPayload = { id: user.id, email: user.email };

    const accessToken = jwt.sign(
      userPayload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh session in DB
    await prisma.session.create({
      data: {
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    res.json({ accessToken, refreshToken, user: userPayload });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ---------------- Supabase Sync ----------------
// This endpoint will let the frontend send Supabase user info
// and ensure it exists in Neon
router.post('/sync', async (req, res) => {
  try {
    const { supabaseUserId, email } = req.body;
    if (!supabaseUserId || !email) {
      return res.status(400).json({ error: 'Missing user ID or email' });
    }

    // Check if user already exists in Neon
    let user = await prisma.user.findUnique({ where: { id: supabaseUserId } });

    if (!user) {
      // Create Neon user
      user = await prisma.user.create({
        data: {
          id: supabaseUserId, // match Supabase ID
          email,
          password: 'supabase', // placeholder, not used
        },
      });
      console.log('✅ Neon user created for Supabase login:', user.id);
    } else {
      console.log('✅ Neon user already exists:', user.id);
    }

    res.json({ user });
  } catch (err) {
    console.error('Supabase sync error:', err);
    res.status(500).json({ error: 'Failed to sync Supabase user', details: err.message });
  }
});

// ---------------- Refresh Token ----------------
router.post('/refresh-token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const storedSession = await prisma.session.findUnique({ where: { token } });
    if (!storedSession) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token verification failed' });

      const userPayload = { id: user.id, email: user.email };
      const newAccessToken = jwt.sign(
        userPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(500).json({ error: 'Could not refresh token' });
  }
});

// ---------------- Logout ----------------
router.post('/logout', async (req, res) => {
  try {
    const { token } = req.body;
    await prisma.session.deleteMany({ where: { token } });
    res.sendStatus(204);
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed' });
  }
});

export default router;

