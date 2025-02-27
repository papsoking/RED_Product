import { useState } from "react";
import {
  ModalBgContainer,
  ModalForm,
  ModalContainer,
  ModalTitleContainer,
  ModalTitle,
  FaArrowLeftIcon,
  InputContainer,
  InputLabel,
  ModalInput,
  InputGroupContainer,
  SelectInput,
  ImgInputContainer,
  ImgInputFileButton,
  ImgInputFile,
  ModalSubmitBtn,
  ModalSubmitContainer,
  ImgPreview,
} from "../styles/modal.style";
import { toast } from "react-hot-toast";
import axios from "axios";
import PropTypes from "prop-types";

export default function HotelModal({ onClose, selectedHotel, setHotels }) {
  const [hotelName, setHotelName] = useState(selectedHotel?.hotelName || "");
  const [adresse, setAdresse] = useState(selectedHotel?.adresse || "");
  const [email, setEmail] = useState(selectedHotel?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    selectedHotel?.phoneNumber || ""
  );
  const [price, setPrice] = useState(selectedHotel?.price || "");
  const [devise, setDevise] = useState(selectedHotel?.devise || "XOF");
  const fullImageUrl = selectedHotel?.image ? `${selectedHotel.image}` : null;
  const [image, setImage] = useState(fullImageUrl); // Initialiser avec l'image existante
  const [imagePreview, setImagePreview] = useState(fullImageUrl);

  const userId = localStorage.getItem("USER_ID");
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}`,
    withCredentials: true,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !hotelName ||
      !adresse ||
      !email ||
      !phoneNumber ||
      !price ||
      !devise ||
      (!image && !selectedHotel)
    ) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("adresse", adresse);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("price", parseFloat(price));
    formData.append("devise", devise);
    if (image && image !== fullImageUrl) {
      formData.append("image", image);
    }
    formData.append("user", userId);

    try {
      const endpoint = selectedHotel
        ? `/hotel/updateHotel/${selectedHotel._id}`
        : "/hotel/addHotel";
      const method = selectedHotel ? "put" : "post";

      await api[method](endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        selectedHotel
          ? "Hôtel modifié avec succès !"
          : "Hôtel ajouté avec succès !"
      );

      onClose();
      const updatedHotels = await api.get("/hotel/getHotel", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHotels(updatedHotels.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Erreur lors de l'opération. Veuillez réessayer."
      );
      console.error(err);
    }
  };

  return (
    <ModalBgContainer onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitleContainer>
          <ModalTitle>
            <FaArrowLeftIcon id="return" onClick={onClose} />
            {selectedHotel ? "MODIFIER UN HÔTEL" : "CRÉER UN NOUVEAU HÔTEL"}
          </ModalTitle>
        </ModalTitleContainer>
        <InputGroupContainer>
          <ModalForm onSubmit={handleSubmit}>
            <InputContainer>
              <InputLabel>Nom de l&apos;hôtel</InputLabel>
              <ModalInput
                type="text"
                name="hotelName"
                placeholder="Mettez le nom de l'hôtel"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Adresse</InputLabel>
              <ModalInput
                type="text"
                name="adresse"
                placeholder="Mettez l'adresse de l'hôtel"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>E-mail</InputLabel>
              <ModalInput
                type="email"
                name="email"
                placeholder="Mettez l'adresse email de l'hôtel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Numéro de téléphone</InputLabel>
              <ModalInput
                type="text"
                name="phoneNumber"
                placeholder="Saisir le numéro de téléphone de l'hôtel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Prix par nuit</InputLabel>
              <ModalInput
                type="number"
                name="price"
                placeholder="Entrez le prix par nuit"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Devise</InputLabel>
              <SelectInput
                name="devise"
                value={devise}
                onChange={(e) => setDevise(e.target.value)}
              >
                <option value="XOF">XOF</option>
                <option value="Euro">Euro</option>
                <option value="Dollar">Dollar</option>
              </SelectInput>
            </InputContainer>
            <InputLabel>Ajouter une photo</InputLabel>
            <ImgInputContainer>
              <ImgInputFileButton>
                <ImgInputFile
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="62"
                  height="47"
                  viewBox="0 0 62 47"
                  fill="none"
                >
                  <path
                    d="M55.7776 46.3738H6.21618C3.05783 46.3738 0.497559 43.8135 0.497559 40.6552V6.34344C0.497559 3.18509 3.05783 0.624817 6.21618 0.624817H55.7776C58.9359 0.624817 61.4962 3.18509 61.4962 6.34344V40.6552C61.4962 43.8135 58.9359 46.3738 55.7776 46.3738ZM13.841 7.29654C10.1563 7.29654 7.16929 10.2836 7.16929 13.9683C7.16929 17.653 10.1563 20.64 13.841 20.64C17.5257 20.64 20.5127 17.653 20.5127 13.9683C20.5127 10.2836 17.5257 7.29654 13.841 7.29654ZM8.12239 38.749H53.8714V25.4055L43.445 14.9792C42.8867 14.4209 41.9815 14.4209 41.4231 14.9792L25.2783 31.1241L18.6643 24.5102C18.106 23.9519 17.2008 23.9519 16.6424 24.5102L8.12239 33.0303V38.749Z"
                    fill="#BDBDBD"
                  />
                </svg>

                <p>Ajouter une photo</p>
              </ImgInputFileButton>
              {imagePreview && (
                <ImgPreview src={imagePreview} alt="Aperçu de l'image" />
              )}
            </ImgInputContainer>
            <ModalSubmitContainer>
              <ModalSubmitBtn type="submit">
                {selectedHotel ? "Modifier" : "Enregistrer"}
              </ModalSubmitBtn>
            </ModalSubmitContainer>
          </ModalForm>
        </InputGroupContainer>
      </ModalContainer>
    </ModalBgContainer>
  );
}

HotelModal.propTypes = {
  onClose: PropTypes.func.isRequired, // Fonction pour fermer le modal
  selectedHotel: PropTypes.shape({
    _id: PropTypes.string,
    hotelName: PropTypes.string,
    adresse: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    price: PropTypes.number,
    devise: PropTypes.string,
    image: PropTypes.string,
  }),
  setHotels: PropTypes.func.isRequired, // Fonction pour mettre à jour la liste des hôtels
};
