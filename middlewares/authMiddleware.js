const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Le token est supposé être dans l'en-tête 'Authorization'

    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token avec la clé secrète
        req.user = decoded; // Ajoute l'utilisateur décodé à la requête
        next(); // Continue le traitement de la route
    } catch (err) {
        return res.status(401).json({ message: "Accès non autorisé, token invalide" });
    }
};

module.exports = authMiddleware;
