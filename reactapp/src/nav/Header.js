import React from 'react';

const Header = ({ showLoginLink, loggedIn, userBalance, onLinksPage }) => {
  return (
    <div>


        <div id="header">
          <a href="/"><h1 id="logo">Gumroad</h1></a>

          {showLoginLink ? (
            <p>Have an account? <a href="/login" id="login-link" className="underline">Login</a></p>
          ) : (
            loggedIn ? (
              <p id="account-navigation">
                {!onLinksPage ? <a href="/links">Your links</a> : <a href="/home">Home</a>} &bull; 
                <span className="balance">${userBalance}</span> &bull; 
                <a href="/settings">Settings</a> &bull; 
                <a href="/logout">Logout</a>
              </p>
            ) : (
              <p>Thanks for using Gumroad! <a href="mailto:hi@gumroad.com">Feedback?</a></p>
            )
          )}

          <ul id="navigation" className="hidden">
            <li><a href="#">Tour</a></li>
            <li><a href="#">Examples</a></li>
            <li><a href="#">Sign up</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="rule"></div>
    </div>
  );
};

export default Header;
