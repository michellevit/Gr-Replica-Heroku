import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./nav/Header";
import Footer from "./nav/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import About from "./pages/About";
import Account from "./pages/Settings";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import Links from "./pages/Links";
import VisitingLink from "./pages/VisitingLink";
import Stats from "./pages/Stats";
import Elsewhere from "./pages/Elsewhere";
import Flickr from "./pages/Flickr";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/404";
import { CsrfProvider } from './contexts/CsrfContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const response = await fetch(`${apiUrl}/api/check_logged_in`, {
        credentials: 'include'
      });
      const result = await response.json();
      setIsLoggedIn(result.loggedIn);
      if (result.loggedIn) {
        setUserBalance(result.user.balance);
      }
    };
    checkLoggedInStatus();
  }, [apiUrl]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/logout`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        console.error('Error logging out: ', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <CsrfProvider>
        <div className="app">
          <div className="top-bar"></div>
          <div id="wrapper">
            <Header 
              showLoginLink={!isLoggedIn} 
              loggedIn={isLoggedIn} 
              userBalance={userBalance} 
              handleLogout={handleLogout} 
            />
            <div className="container">
              <Routes>
              <Route path="/" element={<Index setIsLoggedIn={setIsLoggedIn} setUserBalance={setUserBalance} />} />
                <Route path="/home" element={<Home 
                                              showError={false} 
                                              errorMessage="" 
                                              numberOfDays={30} 
                                              showChart={true} 
                                              chartMax={100} 
                                              chartNumbers="50,60,70,80,90,100" 
                                              lastSevenDaysPurchaseTotal={100} 
                                              lastMonthPurchaseTotal={500} 
                                              purchaseTotal={1000} 
                                            />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserBalance={setUserBalance} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/links" element={<Links />} />
                <Route path="/visitinglink" element={<VisitingLink />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/elsewhere" element={<Elsewhere />} />
                <Route path="/flickr" element={<Flickr />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
    </CsrfProvider>
  );
}

export default App;
