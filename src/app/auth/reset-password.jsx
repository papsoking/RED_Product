import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Container,
  AuthTitle,
  AuthContainer,
  Input,
  DivFlex,
  BtnSubmit,
  AuthFooter,
  Para,
  AppLogo,
} from "../../styles/auth.style";

export default function ResetPasswordPage() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmerPassword, setConfirmerPassword] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = urlParams.get("token");

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    } else {
      toast.error("Token non trouvé dans l'URL.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmerPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/confirm-password`,
        { token, password }, // Corps de la requête
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        toast.success("Mot de passe modifié avec succès !");
        window.location.href = "/auth/login";
      } else {
        toast.error(response.data.message || "Une erreur s'est produite.");
      }
    } catch (err) {
      toast.error("Erreur lors de la modification du mot de passe.");
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Container>
        <AuthTitle>
          <AppLogo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              d="M2.66608 2.66626H29.3287V29.3288L2.66608 2.66626Z"
              fill="white"
            />
            <path
              d="M2.66608 2.66626H22.663L15.9974 15.9976L2.66608 2.66626Z"
              fill="black"
              opacity="0.15"
            />
            <path
              d="M2.66608 2.66626H15.9974L2.66608 29.3288V2.66626Z"
              fill="white"
            />
          </AppLogo>
          RED PRODUCT
        </AuthTitle>
        <AuthContainer>
          <form onSubmit={handleSubmit}>
            <Para $black>Changer votre mot de passe</Para>
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirmez votre mot de passe"
              value={confirmerPassword}
              onChange={(e) => setConfirmerPassword(e.target.value)}
              required
            />
            <BtnSubmit type="submit">Enregistrer</BtnSubmit>
          </form>
        </AuthContainer>
        <AuthFooter>
          <DivFlex>
            <Para $bold>Revenir à la </Para>
            <Para $bold>
              <a href="/auth/login"> connexion</a>
            </Para>
          </DivFlex>
        </AuthFooter>
      </Container>
    </div>
  );
}
