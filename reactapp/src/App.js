import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './nav/Header';
// import Head from './nav/Head';
import Footer from './nav/Footer';
import Home from './pages/Home';
import Index from './pages/Index';
import About from './pages/About';
import Account from './pages/Account';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import LinkForm from './pages/LinkForm';
import Links from './pages/Links';
import VisitingLink from './pages/VisitingLink';
import Stats from './pages/Stats';
import Elsewhere from './pages/Elsewhere';
import Flickr from './pages/Flickr';
import FAQ from './pages/FAQ';
import NotFound from './pages/404';



function App() {
  return (
    <div className="app">
      {/* <Head title="Gumroad - Selling should be as easy as sharing a link." /> */}
      <Header />
      <div className="container">
        <Routes>
        <Route path="/home" element={<Home />} />
         <Route path="/index" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/* <Route path="/link" element={<LinkForm />} /> */}
          <Route path="/links" element={<Links />} />
          <Route path="/visitinglink" element={<VisitingLink />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/elsewhere" element={<Elsewhere />} />
          <Route path="/flickr" element={<Flickr />} />
          <Route path="/faq" element={<FAQ />} />
          {/* Catch-all route for 404 - Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
