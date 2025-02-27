import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Container,
  AuthTitle,
  AuthContainer,
  Input,
  Checkbox,
  Label,
  DivFlex,
  BtnSubmit,
  AuthFooter,
  Para,
  AppLogo,
} from "../../styles/auth.style";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(AuthContext); // Extrayez `login` du contexte
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.loggedIn) {
      navigate("/hotel/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Connexion réussie !");
        const { token } = response.data; // Extraire le token de la réponse
        login(token); // Appeler la fonction login pour mettre à jour l'état de l'utilisateur
        
        localStorage.setItem('USER_ID', response.data.userId)
        navigate("/dashboard"); // Rediriger vers le tableau de bord
      } else {
        toast.error("Une erreur s'est produite.");
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion :", error.response?.data || error.message);
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
          <form action="" onSubmit={handleSubmit}>
            <Para $black>Connectez-vous en tant que Admin</Para>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <DivFlex>
              <Checkbox type="checkbox" id="remember" />
              <Label htmlFor="remember">Gardez-moi connecté</Label>
            </DivFlex>
            <BtnSubmit type="submit">Se connecter</BtnSubmit>
          </form>
        </AuthContainer>
        <AuthFooter>
          <Para $bold>
            <a href="/auth/forgotPassword">Mot de passe oublié ?</a>
          </Para>
          <DivFlex>
            <Para $bold>Vous n&apos;avez pas de compte ? </Para>
            <Para $bold>
              <a href="/auth/register"> S&apos;inscrire</a>
            </Para>
          </DivFlex>
        </AuthFooter>
      </Container>
    </div>
  );
}