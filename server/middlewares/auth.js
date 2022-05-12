import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);
    throw new Error('Unauthenticated, no token');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId);
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Unauthenticated, no token');
  }
};

const admin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
