// App.js
import React, { useContext } from "react";
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./nav/Header";
import Footer from "./nav/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import About from "./pages/About";
import Link from "./pages/Link";
import EditLink from "./pages/EditLink";
import Links from "./pages/Links";
import Success from "./pages/Success";
import VisitingLink from "./pages/VisitingLink";
import Product from './pages/Product';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import WrappedVisitingLink from './pages/WrappedVisitingLink';
import Stats from "./pages/Stats";
import Elsewhere from "./pages/Elsewhere";
import Flickr from "./pages/Flickr";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/404";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/logout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        setUser(null);
        navigate('/'); 
      } else {
        console.error('Error logging out: ', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="app">
      <div className="top-bar"></div>
      <div id="wrapper">
        <Header 
          onLinksPage={false} 
          handleLogout={handleLogout}
        />
        <div className="container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/links" element={<Links />} />
            <Route path="/add" element={<Link />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/elsewhere" element={<Elsewhere />} />
            <Route path="/flickr" element={<Flickr />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/add" element={<Link />} />
            <Route path="/visiting-link" element={<VisitingLink />} />
            <Route path="/edit/:permalink" element={<EditLink />} />
            <Route path="/product/:permalink" element={<Product />} />
            <Route path="/links" element={<Links />} />
            <Route path="/l/:permalink" element={<WrappedVisitingLink />} />
            <Route path="/success" component={Success} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
