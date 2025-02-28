const JWT_SECRET = process.env.JWT_SECRET;
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require("../utils/error.utils");
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: maxAge
  });
};

const signUp = async (req, res) => {
  const { nom, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await UserModel.create({ nom, email, password: hashedPassword });
    res.json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.json({ message: errors });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur par e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Comparer le mot de passe fourni avec le mot de passe haché
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = createToken(user._id);

    // Répondre avec un message de succès et le token
    res.status(200).json({ message: "Connexion réussie", token, userId: user._id });
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.json({ message: "Déconnexion réussie" });
};

// Créer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// 1. Demander la réinitialisation du mot de passe
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Générer un token de réinitialisation
    const resetToken = generateResetToken();

    // Enregistrer le token et sa date d'expiration dans la base de données
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    // Lien de réinitialisation
    const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}`;

    // Envoyer le lien par e-mail
    await transporter.sendMail({
      from: {
        name: "RED Product", 
        address: process.env.EMAIL
      },
      to: user.email,
      subject: 'Réinitialisation de mot de passe',
      html: `<h3>Bonjour `+ user.nom +`,</h3>
             <p>Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour créer un nouveau mot de passe.<br /> Ce lien est valide pendant une heure.</p>
             <a href="${resetUrl}">Réinitialiser le mot de passe</a>
             <p>Si vous n'avez pas demandé cette action, ignorez cet e-mail.</p>`
    });

    res.status(200).json({ message: 'Lien de réinitialisation envoyé par e-mail' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 2. Réinitialiser le mot de passe
const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log("Mot de passe reçu avant hachage :", password);

  try {
    // Trouver l'utilisateur avec un token valide et non expiré
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(404).json({ message: 'Token invalide ou expiré' });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe et réinitialiser les champs de réinitialisation
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Sauvegarder les modifications
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword, resetPasswordToken: undefined, resetPasswordExpires: undefined } }
    );
    

    // Répondre avec un message de succès
    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


module.exports = {
  signUp,
  signIn,
  logout,
  requestPasswordReset,
  resetPassword
};