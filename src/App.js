import React from "react";
import Footer from "./layout/FOOTER/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/REGISTRATION/Registration";
import Login from "./pages/LOGIN/Login";
import Main from "./pages/MAIN/Main";
import Layout from "./layout/Layout";
import { LikeProvider } from "./context/LikeContext";
import { AuthProvider } from "./context/AuthContext";
import TermsOfService from "./pages/TERMSOFSERVICE/termsofservice";
import ProductPage from "./pages/PRODUCTPAGE/ProductPage";
import Side from "./components/side";
import PaymentForm from "./pages/PAYMENTPAGE/Payment";
import Profile from "./pages/PROFILE/Profile";
import Favorites from "./pages/FAVORITE/Favorite";
import CategoryPage from "./pages/CATEGORYPAGE/CategoryPage";
import SearchPage from "./pages/SEARCHPAGE/SearchPage";
import TechnicService from "./pages/technicService/technicService";
import { CartProvider } from './context/CartContext';
import ForgotPassword from "./pages/FORGOTPASSWORD/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function AppContent() {
 
  const location = useLocation();
  const path = location.pathname;


  const hideSidebarRoutes = ["/search", "/register", "/login"];
  const shouldHideLayout = hideSidebarRoutes.includes(path);

  return (
    <>

      {!shouldHideLayout && (
        <>
          <Side />
        </>
      )}
      <Layout/>
      <Routes>
      <Route path="/technicService" element={<TechnicService />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
     <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorite" element={<Favorites />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <LikeProvider>
      <AppContent />
      </LikeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;