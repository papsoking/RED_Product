const express = require("express");
const multer = require("multer");
const { uploadHotel } = require('../config/multer');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const upload = require("../config/multer"); // Importez la configuration de multer
const authMiddleware = require("../middlewares/authMiddleware");
const Hotel = require("../models/hotel.model");


const {
    setHotel,
    getHotel,
    updateHotel,
    deleteHotel
} = require("../controllers/hotel.controller");

const router = express.Router();

// Routes protégées : seulement les utilisateurs authentifiés peuvent accéder à ces routes

router.get("/getHotel", authMiddleware, getHotel);

router.post('/addHotel', authMiddleware, (req, res, next) => {
    uploadHotel.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Erreur liée à l\'upload du fichier.' });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, async (req, res) => {
    const { hotelName, adresse, email, phoneNumber, price, devise } = req.body;
    const userId = req.user.id;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Veuillez télécharger un fichier au format JPG, JPEG ou PNG.' });
        }

        const imageUrl = await uploadToCloudinary(req.file.buffer, 'hotels');

        // Validation des champs
        if (!hotelName || !adresse || !email || !phoneNumber || !price || !devise || !imageUrl) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        if (devise !== 'XOF' && devise !== 'Euro' && devise !== 'Dollar') {
            return res.status(400).json({ message: 'Veuillez entrer une devise valide (XOF, Euro, Dollar).' });
        }

        const existingHotel = await Hotel.findOne({ hotelName, adresse });
        if (existingHotel) {
            return res.status(400).json({ message: 'L\'hôtel existe déjà' });
        }

        const hotel = new Hotel({
            hotelName,
            adresse,
            email,
            phoneNumber,
            price,
            devise,
            image: imageUrl,
            user: userId
        });

        await hotel.save();

        res.status(201).json({ message: 'Hôtel créé avec succès', hotel });
    } catch (err) {
        console.log(err)
    }
});



// Route pour modifier un hôtel
router.put('/updateHotel/:id', authMiddleware, (req, res, next) => {
    uploadHotel.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Erreur liée à l\'upload du fichier.' });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, async (req, res) => {
    const { hotelName, adresse, email, phoneNumber, price, devise } = req.body;

    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hôtel non trouvé' });
        }

        // Vérifiez si une nouvelle image a été téléchargée
        let imageUrl = hotel.image;
        if (req.file) {
            // Supprimer l'ancienne image de Cloudinary
            const publicId = hotel.image.split('/').pop().split('.')[0];
            await deleteFromCloudinary(`hotels/${publicId}`);

            imageUrl = await uploadToCloudinary(req.file.buffer, 'hotels');
        }

        // Mettez à jour les champs de l'hôtel
        hotel.hotelName = hotelName || hotel.hotelName;
        hotel.adresse = adresse || hotel.adresse;
        hotel.email = email || hotel.email;
        hotel.phoneNumber = phoneNumber || hotel.phoneNumber;
        hotel.price = price || hotel.price;
        hotel.devise = devise || hotel.devise;
        hotel.image = imageUrl;

        await hotel.save();

        res.status(200).json({ message: 'Hôtel modifié avec succès', hotel });
    } catch (error) {
        console.error('Erreur lors de la modification de l\'hôtel:', error);
        res.status(500).json({ message: `Erreur serveur: ${error.message}` });
    }
});

router.delete("/deleteHotel/:id", authMiddleware, deleteHotel);

module.exports = router;
