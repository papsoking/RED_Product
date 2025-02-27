import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";

export const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const TitleSectionContainer = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
`;

export const TitleSection = styled.h2`
  margin: 0;
  font-weight: normal;
`;
export const TitleSectionSpan = styled.span`
  margin: 0 0 0 10px;
  color: rgba(195, 195, 195, 0.87);
  font-size: 1.5rem;
  font-weight: 300;
`;

export const ContainerForModal = styled.iframe`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: inherit;
  background-color: white;
  border: none;
  border-radius: 10px;
  z-index: 1000;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnAddHotel = styled.button`
  background-color: transparent;
  border: 1px solid #aeaeae;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #aeaeae;
  }
`;

export const AddHotelIcon = styled(IoIosAdd)`
  width: 24px;
  height: 24px;
`;

export const HotelCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  height: fit-content;
  padding: 20px;
  background-color: #f0f0f0;
`;

export const HotelCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 100%;
`;

export const HotelCardImg = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 10px 10px 0 0;
`;

export const HotelImage = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
  display: block;
`;

export const HotelDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  height: fit-content;
`;

export const HotelAdresse = styled.p`
  color: #8d4b38;
  font-size: 1rem;
`;

export const HotelName = styled.h4`
  color: #222;
  margin: 0 0 20px;
  font-size: 1.5rem;
`;

export const HotelNightPrice = styled.p`
  color: #222;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    fill: red;
    font-size: 20px;
    cursor: pointer;
  }

  & svg.modify {
    fill: green;
    font-size: 18px;
  }

  & svg:hover {
    background-color: yellow;
  }
`;