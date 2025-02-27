const { body, validationResult } = require('express-validator');

const validateSignUp = [
  body('nom').isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),
  body('email').isEmail().withMessage("L'email n'est pas valide"),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  }
];

module.exports = validateSignUp;

const validateSignIn = [
  body('email').isEmail().withMessage("L'email n'est pas valide"),
  body('password').isLength({ min: 6 }).withMessage("Le mot de passe n'est pas correcte"),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  }
];

module.exports = validateSignIn;