// authMiddleware.js
import supabase from '../supabaseClientBackend.js';

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ error: 'Invalid auth header' });
    }

    // Verify token via Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request
    req.user = user;
    next();

  } catch (err) {
    console.error('Supabase auth failed:', err);
    res.status(401).json({ error: 'Authentication failed' });
  }
}
