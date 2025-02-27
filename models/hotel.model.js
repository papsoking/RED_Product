const mongoose = require("mongoose");
const { isEmail } = require("validator");

const HotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "Email invalide"],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    devise: {
      type: String,
      enum: ["XOF", "Euro", "Dollar"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Supprime l'index unique sur l'email si déjà créé
HotelSchema.index({ email: 1 }, { unique: false });

module.exports = mongoose.model("Hotel", HotelSchema);
