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

export default function RegisterPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.loggedIn) {
      navigate("/hotel/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nomError = document.querySelector(".nom.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const termsError = document.querySelector(".terms.error");
    const terms = document.getElementById("terms");

    termsError.innerHTML = "";

    if (!terms.checked)
      termsError.innerHTML = "Veuillez valider les conditions générales";

    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
        {
          nom,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.errors) {
          if (res.data.errors.nom) nomError.innerHTML = res.data.errors.nom;
          if (res.data.errors.email)
            emailError.innerHTML = res.data.errors.email;
          if (res.data.errors.password)
            passwordError.innerHTML = res.data.errors.password;
        } else {
          navigate("/auth/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Para $black>Inscrivez-vous en tant que Admin</Para>
            <Input
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <div className="nom error"></div>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="email error"></div>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="password error"></div>
            <DivFlex>
              <Checkbox type="checkbox" id="terms" />
              <Label htmlFor="terms">Accepter les termes et la politique</Label>
              <div className="terms error"></div>
            </DivFlex>
            <BtnSubmit type="submit">S&apos;inscrire</BtnSubmit>
          </form>
        </AuthContainer>
        <AuthFooter>
          <DivFlex>
            <Para $bold>Vous avez déjà compte ? </Para>
            <Para $bold>
              <a href="/auth/login"> Se connecter</a>
            </Para>
          </DivFlex>
        </AuthFooter>
      </Container>
    </div>
  );
}
