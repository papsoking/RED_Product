import { useState, useEffect } from "react";
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import { Main } from "../../styles/dashboard.style";
import axios from "axios";
import {
  AddHotelIcon,
  BtnAddHotel,
  HotelAdresse,
  HotelCard,
  HotelCardImg,
  HotelCardsContainer,
  HotelDescription,
  HotelImage,
  HotelName,
  HotelNightPrice,
  PageContainer,
  TitleSectionContainer,
  TitleSection,
  TitleSectionSpan,
} from "../../styles/hotels.style";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import HotelModal from "../../components/HotelModal";

export default function ListeHotels() {
  const [isModalContainerVisible, setIsModalContainerVisible] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // Pour gérer la modification

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem("USER_ID");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user?.loggedIn) {
      navigate("/auth/login", { replace: true });
    } else {
      navigate("/hotel/listehotels", { replace: true });
    }
  }, [user, navigate]);

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}`,
    withCredentials: true,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      if (!token) {
        toast.error("Token manquant. Veuillez vous reconnecter.");
        navigate("/auth/login", { replace: true });
        return;
      }
      try {
        const response = await api.get("/hotel/getHotel", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setHotels(response.data);
      } catch (err) {
        toast.error("Erreur lors de la récupération des hôtels :", err);
      }
    };

    fetchHotels();
  }, [token, api, navigate]);

  const showModalContainer = () => setIsModalContainerVisible(true);
  const hideModalContainer = () => {
    setIsModalContainerVisible(false);
    setSelectedHotel(null); // Réinitialiser l'hôtel sélectionné
  };

  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel); // Définir l'hôtel à modifier
    showModalContainer(); // Ouvrir le modal
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      await api.delete(`/hotel/deleteHotel/${hotelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Hôtel supprimé avec succès !");
      const updatedHotels = await api.get("/hotel/getHotel", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setHotels(updatedHotels.data);
    } catch (err) {
      toast.error("Erreur lors de la suppression de l'hôtel :" + err);
    }
  };

  return (
    <>
      <SideBar $value={false} />
      <Main>
        <Header title={["Liste des hôtels"]} />
        <PageContainer>
          <TitleSectionContainer>
            <TitleSection>
              Hôtels
              <TitleSectionSpan>{hotels.length}</TitleSectionSpan>
            </TitleSection>
            <BtnAddHotel id="btn-addHotel" onClick={showModalContainer}>
              <AddHotelIcon />
              Créer un nouveau hôtel
            </BtnAddHotel>
          </TitleSectionContainer>

          <HotelCardsContainer>
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id}>
                <HotelCardImg>
                  <HotelImage src={`${hotel.image}`} alt={hotel.name} />
                </HotelCardImg>
                <HotelDescription>
                  <HotelAdresse>{hotel.adresse}</HotelAdresse>
                  <HotelName>{hotel.hotelName}</HotelName>
                  <HotelNightPrice>
                    {hotel.price} {hotel.devise} par nuit
                    {hotel.user === userId && (
                      <>
                        <MdDelete
                          onClick={() => handleDeleteHotel(hotel._id)}
                        />
                        <BsPencilFill
                          className="modify"
                          onClick={() => handleEditHotel(hotel)}
                        />
                      </>
                    )}
                  </HotelNightPrice>
                </HotelDescription>
              </HotelCard>
            ))}
          </HotelCardsContainer>
        </PageContainer>
      </Main>

      {isModalContainerVisible && (
        <HotelModal
          onClose={hideModalContainer}
          selectedHotel={selectedHotel}
          setHotels={setHotels}
        />
      )}
    </>
  );
}
