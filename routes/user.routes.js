const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Les information de l'utilisateur
router.get('/userInfo/:id', userController.userInfo);

// Mise à jour des information de l'utilisateur en cas de changement
router.put('/updateUser/:id', userController.updateUser);

// Pour supprimer un utilisateur
// router.get('/deleteUser/:id', userController.deleteUser);

module.exports = router;
