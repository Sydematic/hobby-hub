import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import hobbyRoutes from './routes/hobbies.js';
import travelRoutes from './routes/travelDB.js'; // <-- import your travel router

dotenv.config();

const app = express();

// Allow frontend (Vite) on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Existing routes
app.use('/api/auth', authRoutes);
app.use('/api/hobbies', hobbyRoutes);

// Travel routes
app.use('/api/travel', travelRoutes); // <-- mount travel routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
