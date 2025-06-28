import JWTUtils from '../utils/jwt.js';
import User from '../models/userDetails.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
      return res.status(401).json({ success: false, message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = JWTUtils.verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive)
      return res.status(401).json({ success: false, message: 'Invalid token or user not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  }
  next();
};
