const HotelModel = require("../models/hotel.model");
const upload = require("../config/multer"); // Importez la configuration de multer

module.exports.getHotel = async (req, res) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.setHotel = async (req, res) => {
  try {
    const { hotelName, adresse, email, phoneNumber, price, devise } = req.body;
    const user = req.user.id;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Veuillez télécharger une image valide." });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, "hotels");

    // Validation des champs
    if (!hotelName || !adresse || !email || !phoneNumber || !price || !devise) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    if (!["XOF", "Euro", "Dollar"].includes(devise)) {
      return res.status(400).json({ message: "Devise invalide." });
    }

    const existingHotel = await HotelModel.findOne({ hotelName, adresse });
    if (existingHotel) {
      return res.status(400).json({ message: "L'hôtel existe déjà" });
    }

    const hotel = new HotelModel({
      hotelName,
      adresse,
      email,
      phoneNumber,
      price,
      devise,
      image: imageUrl,
      user,
    });

    await hotel.save();

    res.status(201).json({ message: "Hôtel créé avec succès", hotel });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const {
  deleteFromCloudinary,
  uploadToCloudinary,
} = require("../config/cloudinary");

module.exports.updateHotel = async (req, res) => {
  try {
    console.log("Body:", req.body); // Vérifiez les données reçues
    console.log("File:", req.file); // Vérifiez le fichier reçu
    const { id } = req.params;
    let updateData = { ...req.body };

    // Vérifie si l'hôtel existe
    const hotel = await HotelModel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hôtel non trouvé" });
    }

    // Gérer la mise à jour de l'image si un fichier est envoyé
    if (req.file) {
      // Supprimer l'ancienne image sur Cloudinary
      if (hotel.image) {
        await deleteFromCloudinary(hotel.image);
      }
      // Uploader la nouvelle image sur Cloudinary
      const newImageUrl = await uploadToCloudinary(req.file.buffer, "hotels");
      updateData.image = newImageUrl;
    }

    const updatedHotel = await HotelModel.findByIdAndUpdate(id, updateData, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;

  try {
    const hotel = await HotelModel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hôtel non trouvé" });
    }

    // Supprimer l'image de Cloudinary
    const publicId = hotel.image.split("/").pop().split(".")[0];
    const finalPublicId = `hotels/${publicId}`;
    await deleteFromCloudinary(finalPublicId);

    // Supprimer l'hôtel de la base de données
    await HotelModel.findByIdAndDelete(hotelId);

    res.status(200).json({ message: "Hôtel supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'hôtel:", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression de l'hôtel" });
  }
};
