import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./nav/Header";
import Footer from "./nav/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import About from "./pages/About";
import Account from "./pages/Account";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Links from "./pages/Links";
import VisitingLink from "./pages/VisitingLink";
import Stats from "./pages/Stats";
import Elsewhere from "./pages/Elsewhere";
import Flickr from "./pages/Flickr";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/404";
// import Loading from "./components/Loading";

function App() {
  return (
    <div className="app">
      <div className="top-bar"></div>
      <div id="wrapper">
      <Header />
      <div className="container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/links" element={<Links />} />
            <Route path="/visitinglink" element={<VisitingLink />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/elsewhere" element={<Elsewhere />} />
            <Route path="/flickr" element={<Flickr />} />
            <Route path="/faq" element={<FAQ />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
      </div>
      
    </div>
    <Footer />
    </div>
  );
}

export default App;