import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
    url("/images/bg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const AuthTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #FFF;
  display: flex;
`;

export const AppLogo = styled.svg`
  width: 32px;
  height: 32px;
  fill: "none";
  margin-right: 10px;
`;

export const AuthContainer = styled.div`
  background-color: #FFF;
  padding: 30px;
  border-radius: 10px;
  max-width: 350px;
  margin: 0 20px 20px;
`;

export const Input = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 5px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid #cccccc;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-bottom: 2px solid #000;
  }
`;

export const Checkbox = styled.input`
  margin-right: 5px;
  transform: scale(1.7);
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 400;
`;

export const BtnSubmit = styled.button`
  font-size: 20px;
  font-weight: 500;
  border: none;
  margin: 10px 0 0 0;
  padding: 12px 0;
  width: 100%;
  border-radius: 5px;
  background: #4b4b4b;
  color: #fff;

  &:hover {
    background-color: #3a3a3a;
    cursor: pointer;
  }
`;

export const AuthFooter = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const DivFlex = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 5px;
`;

export const Para = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: ${(props) => (props.$bold ? 700 : 400)};
  color: ${(props) => {
    if (props.$black) {
      return "#000";
    }

    return "#FFF";
  }};

  & a {
    color: #ffd964;
    text-decoration: none;
  }

  & a:hover {
    color: yellow;
  }
`;
