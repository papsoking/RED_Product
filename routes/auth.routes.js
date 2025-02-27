const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validateSignUp = require('../middlewares/validateInputs.middleware');

// Route d'inscription
router.post('/register', validateSignUp, authController.signUp);

// Route de connexion
router.post('/login', authController.signIn);

// Route de déconnexion
router.get('/logout', authController.logout);

router.post('/reset-password', authController.requestPasswordReset);
router.post("/confirm-password", authController.resetPassword);

module.exports = router;
