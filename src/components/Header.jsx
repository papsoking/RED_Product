import PropTypes from "prop-types";
import {
  HeaderContainer,
  HeaderSection,
  HeaderSectionTitle,
  HeaderInfo,
  SearchBarContainer,
  SearchSubmit,
  FaSearchInput,
  SearchBar,
  NotificationContainer,
  NotificationIcon,
  UserImageContainerHeader,
  BtnLogout,
  LogoutIcon,
} from "../styles/header.style";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Header({ title }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Appelle la fonction logout du contexte
    navigate("/auth/login", { replace: true }); // Redirige vers la page de login
    toast.success("Déconnexion réussis");
  };

  // Vérifie si `title` est bien défini et s'il a au moins deux éléments
  const firstTitle = Array.isArray(title) && title[0] ? title[0] : "Titre par défaut";

  return (
    <HeaderContainer>
      <HeaderSection>
        <HeaderSectionTitle>{firstTitle}</HeaderSectionTitle>
        <HeaderInfo>
          <form action="" method="get">
            <SearchBarContainer>
              <SearchSubmit type="submit">
                <FaSearchInput />
              </SearchSubmit>
              <SearchBar type="search" placeholder="Rechercher" />
            </SearchBarContainer>
          </form>
          <NotificationContainer data-badge="3">
            <NotificationIcon />
          </NotificationContainer>
          <UserImageContainerHeader />
          {/* Supprimez le formulaire inutile autour du bouton de déconnexion */}
          <BtnLogout onClick={handleLogout}>
            <LogoutIcon />
          </BtnLogout>
        </HeaderInfo>
      </HeaderSection>
    </HeaderContainer>
  );
}

Header.propTypes = {
  title: PropTypes.array.isRequired,
};