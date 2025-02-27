import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./app/auth/login.jsx";
import RegisterPage from "./app/auth/register.jsx";
import ForgotPassword from "./app/auth/forgotPassword.jsx";
// import SideBar from "./components/Sidebar.jsx";
// import Header from "./components/Header.jsx";
import Dashboard from "./app/hotel/dashboard.jsx";
import ListeHotels from "./app/hotel/listehotels.jsx";
import ResetPasswordPage from "./app/auth/reset-password.jsx";
import HotelModal from "./components/HotelModal.jsx";

function App() {
  return (
    <Routes>
      {/* Redirection par défaut vers /auth/login */}
      <Route path="/" element={<Navigate to="/auth/login" />} />

      {/* Routes Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      {/* <Route path="/components/SideBar" element={<SideBar />} />
      <Route path="/components/Header" element={<Header />} /> */}
      {/* <Route path="/hotel/home" element={<HomePage />} /> */}
      <Route path="/hotel/dashboard" element={<Dashboard />} />
      <Route path="/hotel/listehotels" element={<ListeHotels />} />
      <Route path="/components/modal" element={<HotelModal />} />
    </Routes>
  );
}

export default App;
