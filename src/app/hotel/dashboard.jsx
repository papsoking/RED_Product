import Header from "../../components/Header";
import SideBar from "../../components/Sidebar";
import {
  Main,
  DashboardContainer,
  TitleSectionDashboard,
  DashboardCardContainer,
  DashboardCard,
  MailOpenIcon,
  DashboardCardInfos,
  PIcon,
  UsersIcon,
  UsersIconPath,
} from "../../styles/dashboard.style";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { BgSidebar } from "../../styles/sidebar.style";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { menuOpen, setMenuOpen } = useContext(AuthContext);
  

  useEffect(() => {
    if (!user?.loggedIn) {
      navigate("/auth/login", { replace: true });
    } else {
      navigate("/hotel/dashboard", { replace: true });
    }
  }, [user, navigate]);

    
  return (
    <>
    <BgSidebar  open={menuOpen} onClick={() => setMenuOpen(false)} />
      <SideBar />
      <Main>
        <Header title={["Dashboard"]} />
        <DashboardContainer>
          <TitleSectionDashboard>
            <h1>Bienvenue sur RED Product</h1>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </TitleSectionDashboard>
          <DashboardCardContainer>
            <DashboardCard>
              <MailOpenIcon />

              <DashboardCardInfos>
                <p>
                  <span>125</span> Formulaires
                </p>
                <p>Je ne sais pas quoi mettre</p>
              </DashboardCardInfos>
            </DashboardCard>
            <DashboardCard>
              <PIcon $defaultPi>P</PIcon>
              <DashboardCardInfos>
                <p>
                  <span>40</span> Messages
                </p>
                <p>Je ne sais pas quoi mettre</p>
              </DashboardCardInfos>
            </DashboardCard>
            <DashboardCard>
              <UsersIcon
                $defaultUsers
                viewBox="0 0 21 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <UsersIconPath d="M7.52991 8.31309C8.2173 8.31309 9.01405 8.40682 9.92016 8.5943C8.32666 9.46916 7.52991 10.6252 7.52991 12.0625V14.3122H0.5466V11.8282C0.5466 11.1095 0.968411 10.469 1.81203 9.9066C2.6869 9.34418 3.63988 8.93799 4.67097 8.68803C5.70206 8.43807 6.65504 8.31309 7.52991 8.31309ZM11.4199 10.0941C12.6697 9.59414 13.8727 9.34418 15.0288 9.34418C16.1848 9.34418 17.3878 9.59414 18.6376 10.0941C19.8874 10.594 20.5123 11.2501 20.5123 12.0625V14.3122H9.54522V12.0625C9.54522 11.2501 10.1701 10.594 11.4199 10.0941ZM9.63896 5.45415C9.0453 6.04781 8.34228 6.34464 7.52991 6.34464C6.71753 6.34464 6.01451 6.04781 5.42085 5.45415C4.82719 4.86049 4.53036 4.15748 4.53036 3.3451C4.53036 2.53273 4.82719 1.82971 5.42085 1.23605C6.01451 0.64239 6.71753 0.34556 7.52991 0.34556C8.34228 0.34556 9.0453 0.64239 9.63896 1.23605C10.2326 1.82971 10.5294 2.53273 10.5294 3.3451C10.5294 4.15748 10.2326 4.86049 9.63896 5.45415ZM16.7629 6.62585C16.2942 7.09453 15.7162 7.32887 15.0288 7.32887C14.3414 7.32887 13.7477 7.09453 13.2478 6.62585C12.7791 6.12592 12.5448 5.53227 12.5448 4.84487C12.5448 4.15748 12.7791 3.56382 13.2478 3.06389C13.7477 2.56397 14.3414 2.31401 15.0288 2.31401C15.7162 2.31401 16.2942 2.56397 16.7629 3.06389C17.2628 3.56382 17.5128 4.15748 17.5128 4.84487C17.5128 5.53227 17.2628 6.12592 16.7629 6.62585Z" />
              </UsersIcon>
              <DashboardCardInfos>
                <p>
                  <span>600</span> Utilisateurs
                </p>
                <p>Je ne sais pas quoi mettre</p>
              </DashboardCardInfos>
            </DashboardCard>
            <DashboardCard>
              <MailOpenIcon $defaultMail />
              <DashboardCardInfos>
                <p>
                  <span>25</span> E-mails
                </p>
                <p>Je ne sais pas quoi mettre</p>
              </DashboardCardInfos>
            </DashboardCard>
            <DashboardCard>
              <PIcon>P</PIcon>
              <DashboardCardInfos>
                <p>
                  <span>40</span> Hôtels
                </p>
                <p>Je ne sais pas quoi mettre</p>
              </DashboardCardInfos>
            </DashboardCard>
            <DashboardCard>
              <UsersIcon viewBox="0 0 21 15" xmlns="http://www.w3.org/2000/svg">
                <UsersIconPath d="M7.52991 8.31309C8.2173 8.31309 9.01405 8.40682 9.92016 8.5943C8.32666 9.46916 7.52991 10.6252 7.52991 12.0625V14.3122H0.5466V11.8282C0.5466 11.1095 0.968411 10.469 1.81203 9.9066C2.6869 9.34418 3.63988 8.93799 4.67097 8.68803C5.70206 8.43807 6.65504 8.31309 7.52991 8.31309ZM11.4199 10.0941C12.6697 9.59414 13.8727 9.34418 15.0288 9.34418C16.1848 9.34418 17.3878 9.59414 18.6376 10.0941C19.8874 10.594 20.5123 11.2501 20.5123 12.0625V14.3122H9.54522V12.0625C9.54522 11.2501 10.1701 10.594 11.4199 10.0941ZM9.63896 5.45415C9.0453 6.04781 8.34228 6.34464 7.52991 6.34464C6.71753 6.34464 6.01451 6.04781 5.42085 5.45415C4.82719 4.86049 4.53036 4.15748 4.53036 3.3451C4.53036 2.53273 4.82719 1.82971 5.42085 1.23605C6.01451 0.64239 6.71753 0.34556 7.52991 0.34556C8.34228 0.34556 9.0453 0.64239 9.63896 1.23605C10.2326 1.82971 10.5294 2.53273 10.5294 3.3451C10.5294 4.15748 10.2326 4.86049 9.63896 5.45415ZM16.7629 6.62585C16.2942 7.09453 15.7162 7.32887 15.0288 7.32887C14.3414 7.32887 13.7477 7.09453 13.2478 6.62585C12.7791 6.12592 12.5448 5.53227 12.5448 4.84487C12.5448 4.15748 12.7791 3.56382 13.2478 3.06389C13.7477 2.56397 14.3414 2.31401 15.0288 2.31401C15.7162 2.31401 16.2942 2.56397 16.7629 3.06389C17.2628 3.56382 17.5128 4.15748 17.5128 4.84487C17.5128 5.53227 17.2628 6.12592 16.7629 6.62585Z" />
              </UsersIcon>

              <DashboardCardInfos>
                <p>
                  <span>02</span> Entités
                </p>
                <p>Je ne sais pas quoi mettre</p>
              </DashboardCardInfos>
            </DashboardCard>
          </DashboardCardContainer>
        </DashboardContainer>
      </Main>
    </>
  );
}
