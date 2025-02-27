const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Connexion à la DB
connectDB()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données", err);
    process.exit(1); // Arrêter le serveur si la connexion échoue
  });

const app = express();

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://red-product-frontend.onrender.com",
    "https://red-product-backend-pieh.onrender.com",
  ],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "sessionId",
  ],
  exposedHeaders: ["sessionId"],
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// Middlewares pour parser les données du formulaire
app.use(express.json()); // Pour parser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les données URL-encoded
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// Routes
app.use("/hotel", require("./routes/hotel.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));

// Lancer le serveur
app.listen(5000, () => {
  console.log("Le serveur a démarré au port " + 5000);
});
