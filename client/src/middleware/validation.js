import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

export const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password too short'),
  body('firstName').isLength({ min: 2 }).withMessage('First name too short'),
  body('lastName').isLength({ min: 2 }).withMessage('Last name too short'),
  handleValidationErrors
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email required'),
  body('password').notEmpty().withMessage('Password required'),
  handleValidationErrors
];
