import styled from "styled-components";
import { AppLogo, AuthTitle, Container } from "./auth.style";
const LINK_COLOR = "#4D5154";
const ACTIVE_LINK_COLOR = "#F0F0F0";

export const BgSidebar = styled.div`
  background: #000;
  width: ${({ open }) => (open ? "100%" : "0")};
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 1000;
`;

export const SideBarContainer = styled(Container)`
  width: 250px;
  height: 100dvh;
  position: fixed;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  left: ${({ open }) => (open ? 0 : "-250px")}; /* Masqué ou visible */
  transition: left 0.3s ease;
  z-index: 1000;

  @media (min-width: 769px) {
    /* position: relative; */
    left: 0; /* Toujours visible en grand écran */
  }
`;

export const SideBarLogo = styled(AuthTitle)`
  padding: 20px 0 0 15px;
`;

export const SideBarTitle = styled.p`
  padding: 0;
  margin: 10px 0 10px 15px;
  color: #fff;
`;

export const SideBarLinksUL = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const SideBarLinksLI = styled.li`
  padding: 0;
  margin: 0;
`;

export const SideBarLinkA = styled.a`
  text-decoration: none;
  font-weight: bold;
  background-color: ${(props) => (props.$active ? ACTIVE_LINK_COLOR : "")};
  color: ${(props) => (props.$active ? LINK_COLOR : ACTIVE_LINK_COLOR)};
  padding: 10px 0 10px 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
  height: fit-content;
  margin: 0 0 10px 0;
`;

export const SideBarLinkIcon = styled(AppLogo)`
  width: 24px;
  height: 24px;

  fill: ${(props) => (props.$active ? LINK_COLOR : ACTIVE_LINK_COLOR)};
  color: ${(props) => (props.$active ? LINK_COLOR : ACTIVE_LINK_COLOR)};

  &path {
    fill: ${(props) => (props.$active ? LINK_COLOR : ACTIVE_LINK_COLOR)};
    color: ${(props) => (props.$active ? LINK_COLOR : ACTIVE_LINK_COLOR)};
  }
`;

export const SideBarLinkIconPath = styled.path`
  clip: "evenodd";
  fill: ${(props) => (props.$active ? ACTIVE_LINK_COLOR : LINK_COLOR)};
  color: ${(props) => (props.$active ? ACTIVE_LINK_COLOR : LINK_COLOR)};
`;

export const SideBarFooter = styled.div`
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0;
  padding: 15px 15px;
`;

export const UserImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  flex-shrink: 0;
  background-image: url("https://placehold.co/50x50@2x.png");
  background-position: top;
  background-size: cover;
`;

export const UserInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 0 0 10px;

  &p.user:first-child {
    color: red;
  }
`;

export const UserName = styled.p`
  margin: 0;
  color: white;
`;

export const UserStatus = styled.div`
  margin: 0;
  color: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
`;

export const UserOnlineIcon = styled.div`
  width: 10px;
  height: 10px;
  background-color: rgb(39, 209, 138);
  border-radius: 100%;
  margin: 0;
  padding: 0;
`;

export const UserOnlineText = styled.p`
  color: white;
  opacity: 0.7;
  padding: 0 0 0 5px;
  margin: 0;
`;
