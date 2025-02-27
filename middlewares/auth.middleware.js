// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user.model");

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Token invalide." });
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
    res.status(401).json({ message: "Accès refusé. Token manquant." });
  }
};

module.exports = { checkUser, requireAuth }; // Exportez les middlewares


const JWT_SECRET = process.env.JWT_SECRET;
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require("../utils/error.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: maxAge
  });
};

module.exports.signUp = async (req, res) => {
  const { nom, email, password } = req.body;

  try {
    const user = await UserModel.create({ nom, email, password });
    res.json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.json({ message: errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.json({ user: user._id, token: token });
  } catch (err) {
    const errors = signInErrors(err);
    res.json({ message: errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.json({ message: "Déconnexion réussie" });
  console.log('déconnecté')
};

