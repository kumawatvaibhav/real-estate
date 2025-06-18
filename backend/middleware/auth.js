const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Expected format: Authorization: Bearer <token>
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer'
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with env secret in production
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
