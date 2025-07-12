import { FaSearch, FaRegBell } from "react-icons/fa";
import styled from "styled-components";
import { UserImageContainer } from "./sidebar.style";
import { FiLogOut } from "react-icons/fi";

export const HeaderContainer = styled.div`
  display: block;
  padding: 10px 0 0 0;
  background: #FFF;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #AEAEAE;
  padding: 10px 20px 15px;
`;

export const MenuHamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const HeaderSectionTitle = styled.h2`
  font-style: normal;
  margin: 0;
  font-size: 26px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 2px solid rgba(120, 130, 140, 0.13);
  border-radius: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FaSearchInput = styled(FaSearch)`
  font-size: 20px;
  padding: 0;
  margin: 0;
`;

export const SearchSubmit = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50% 0 0 50%;
  cursor: pointer;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  color: #AEAEAE;
`;

export const SearchBar = styled.input`
  max-width: 300px;
  min-width: 0;
  margin: 0;
  padding: 0 5px;
  border: none;
  font-size: 18px;
  background: #fff;

  &:focus {
    border: none;
    outline: none;
  }
`;

export const NotificationContainer = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0 10px 0 0;

  &::after {
    content: attr(data-badge);
    font-size: 15px;
    font-weight: bold;
    position: absolute;
    background-color: #fcc100;
    padding: 0px 5px;
    color: white;
    border-radius: 5px;
    margin: -10px 0 0 -3px;
  }
`;

export const NotificationIcon = styled(FaRegBell)`
  font-size: 20px;
  position: relative;
`;

export const UserImageContainerHeader = styled(UserImageContainer)`
  width: 40px;
  height: 40px;

  &::after {
    content: "";
    position: absolute;
    background-color: rgb(39, 209, 138);
    border: 3px solid white;
    border-radius: 50%;
    margin: 25px 0 0 25px;
    width: 10px;
    height: 10px;
  }
`;

export const BtnLogout = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

export const LogoutIcon = styled(FiLogOut)`
  font-size: 24px;
`;