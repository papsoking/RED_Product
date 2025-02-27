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
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/reset-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // axios parse déjà la réponse en JSON, pas besoin de response.json()
      if (response.status === 200) {
        toast.success(
          "Instructions pour réinitialiser votre mot de passe envoyées par e-mail !"
        );
      } else {
        toast.error(response.data.message || "Une erreur s'est produite.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la demande de réinitialisation."
      );
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
            <Para $black>Mot de passe oublié ?</Para>
            <p>
              Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
              instructions sur la façon de modifier de votre mot de passe.
            </p>
            <Input
              type="email"
              placeholder="Votre e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <BtnSubmit type="submit">Envoyer</BtnSubmit>
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
