import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa6";
import { BtnSubmit } from "./auth.style";

export const ModalBgContainer = styled.div`
position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalForm = styled.form`
  display: contents;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: inset;
  max-width: 55rem;
  width: 70%;
  height: fit-content;
  min-width: 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 0 20px;
    width: 95%;
  }
`;

export const ModalTitleContainer = styled.div`
  width: 100%;
  border-bottom: 2px dashed #DDD;
  margin: 0 0 20px 0;
  padding: 10px 0;
`;

export const FaArrowLeftIcon = styled(FaArrowLeft)`
  cursor: pointer;
  margin: 0 10px 0 0;
`;

export const ModalTitle = styled.h3`
  color: #555;
  width: fit-content;
`;

export const InputGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  //flex: 1; // Prendre l'espace disponible
  min-width: 200px;
  width: 48%;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const InputLabel = styled.label`
  color: #555;
  margin: 0 0 10px 0;
`;

export const ModalInput = styled.input`
  border: 1.302px solid #DDD;
  max-width: 100%;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
`;

export const SelectInput = styled.select`
  border: 1.302px solid #DDD;
  max-width: 100%;
  width: 100%;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #DDD;
`;

export const ImgInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  border: 1px solid #DDD;
  border-radius: 10px;
  color: #BDBDBD;
  background-color: transparent;
  margin: -20px 0 0 0;
  position: relative;
`;

export const ImgInputFileButton = styled.div`
  width: fit-content;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
`;

export const ImgInputFile = styled.input`
  opacity: 0;
  height: 70px;
  position: absolute;
  cursor: pointer;
  z-index: 1;
`;

export const ModalSubmitContainer = styled.div`
width: 100%;
display: flex;
justify-content: end;
`;

export const ModalSubmitBtn = styled(BtnSubmit)`
width: fit-content;
padding: 10px;
align-self: flex-end;
margin: 0;
font-size: 1rem;
`;

export const ImgPreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  position: absolute;
  width: inherit;
  object-fit: cover;
`;

export const Notif = styled.p`
padding: 10px 5px;
background-color: #d1e7dd;
/* background-color: #f8d7da; */
color: #0a3622;
/* color: #58151c; */
/* border:1px solid  #f1aeb5; */
border:1px solid #a3cfbb;
width: 100%;
font-weight: bold;
border-radius: 10px;
`;