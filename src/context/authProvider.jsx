import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Vérifier si l'utilisateur est connecté au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ loggedIn: true }); // Marquer l'utilisateur comme connecté
    }
  }, []);

  // Fonction de connexion
  const login = (token) => {
    localStorage.setItem("token", token); // Stocker le token dans le localStorage
    setUser({ loggedIn: true }); // Mettre à jour l'état de l'utilisateur
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    localStorage.removeItem("USER_ID"); // Supprimer le token du localStorage
    setUser(null); // Réinitialiser l'état de l'utilisateur
    navigate("/auth/login"); // Rediriger vers la page de connexion
  };

  // Fonction de toggle du menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, menuOpen, setMenuOpen, toggleMenu }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};