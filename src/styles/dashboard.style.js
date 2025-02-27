import styled from "styled-components";
import { PageContainer } from "./hotels.style";
import { IoMailOpenSharp } from "react-icons/io5";

export const Main = styled.div`
  margin: 0 0 0 250px;
  padding: 0;
  background: #f0f0f0;
  height: 100dvh;
`;

export const DashboardContainer = styled(PageContainer)`
  margin: 0;
  padding: 0;
`;

export const TitleSectionDashboard = styled.div`
  display: block;
  background-color: #fff;
  padding: 15px 20px;

  & h1 {
    font-style: normal;
    font-weight: 300;
  }

  & p {
    opacity: 0.6;
  }
`;

export const DashboardCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 20px;
  grid-gap: 30px;
`;

export const DashboardCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
`;

export const DashboardCardInfos = styled.div`
  & span {
    font-size: 31.995px;
    font-style: normal;
    font-weight: 300;
  }

  & p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
  }
  & p:nth-child(2) {
    font-weight: 400;
    opacity: 0.6;
  }
`;

export const MailOpenIcon = styled(IoMailOpenSharp)`
  padding: 20px;
  background-color: ${(props) => (props.$defaultMail ? "#ff0000" : "#A88ADD")};
  fill: white;
  border-radius: 50%;
  font-size: 24px;
`;

export const PIcon = styled.h1`
  background-color: ${(props) => (props.$defaultPi ? "#0CC2AA" : "#9C27B0")};
  color: white;
  border-radius: 50%;
  font-size: 24px;
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UsersIcon = styled.svg`
  background-color: ${(props) => (props.$default ? "#FCC100" : "#1565C0")};
  fill: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  padding: 20px;
`;

export const UsersIconPath = styled.path`
  fill: white;
`;
