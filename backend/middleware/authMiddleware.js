// backend/middleware/authMiddleware.js
import fetch from "node-fetch";

/**
 * Middleware to authenticate users via Supabase JWT.
 * Attaches the Supabase user object to req.user if valid.
 */
export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Invalid auth header" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseKey, // Required for Supabase auth verification
      },
    });

    const data = await response.json();

    if (!response.ok || !data?.id) {
      console.warn("❌ Supabase rejected token:", data);
      return res.status(401).json({ error: "Authentication failed" });
    }

    // ✅ Attach user to request
    req.user = data;
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err);
    return res.status(401).json({ error: "Authentication failed" });
  }
}

