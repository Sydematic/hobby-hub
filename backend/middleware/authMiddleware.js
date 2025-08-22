import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 req.user = decoded;  // store full decoded token object, e.g. { id: ..., iat: ..., exp: ... }
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}
