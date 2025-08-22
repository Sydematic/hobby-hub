// backend/routes/session.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /session - create backend JWT for a logged-in Supabase user
router.post("/", async (req, res) => {
  const { supabaseUserId } = req.body; // frontend sends this after Supabase login

  if (!supabaseUserId) {
    return res.status(400).json({ error: "Missing user ID" });
  }

  try {
    // payload for your backend JWT
    const payload = { id: supabaseUserId };

    // create JWT valid for 1 hour (or your desired duration)
    const backendToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ backendToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create backend token" });
  }
});

export default router;
