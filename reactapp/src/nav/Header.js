import React from 'react';

const Header = ({ showLoginLink, loggedIn, userBalance, handleLogout, onLinksPage }) => {
  return (
    <div>
      <div id="header">
        <a href={loggedIn ? "/home" : "/"}><h1 id="logo">Gumroad</h1></a>

        {!loggedIn ? (
          <p>Have an account? <a href="/login" id="login-link" className="underline">Login</a></p>
        ) : (
          <p id="account-navigation">
            {!onLinksPage ? <a href="/links">Your links</a> : <a href="/home">Home</a>} &bull; 
            <span className="balance">${userBalance}</span> &bull; 
            <a href="/settings">Settings</a> &bull; 
            <button onClick={handleLogout} >Logout</button>
          </p>
        )}

        <ul id="navigation" className="hidden">
          <li><a href="/tour">Tour</a></li>
          <li><a href="/examples">Examples</a></li>
          <li><a href="/signup">Sign up</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </div>

      <div className="rule"></div>
    </div>
  );
};

export default Header;
