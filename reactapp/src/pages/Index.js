// src/pages/Index.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Index = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const response = await fetch(`${apiUrl}/api/check_logged_in`, {
        credentials: 'include',
      });
      const result = await response.json();
      if (result.loggedIn) {
        setUser(result.user);
        navigate('/home');
      }
    };
    checkLoggedInStatus();
  }, [apiUrl, setUser, navigate]);

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password.value,
    };

    try {
      const response = await fetch(`${apiUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        navigate('/home');
      } else {
        const errorData = await response.json();
        setShowError(true);
        setErrorMessage(errorData.error);
        console.error('Signup error:', errorData);
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('An error occurred during signup.');
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container">
      <div id="intro">
        <div id="video"></div>
        <ul>
          <li id="we-handle-payments">
            <h5>We handle all the payment stuff.</h5>
            <p>You should be focused on creating awesome content. We'll deal with the rest.</p>
          </li>
          <li id="worldwide">
            <h5>Do what you already do.</h5>
            <p>Use the channels you already have with your fans and followers. You <em>are</em> the distribution. No store needed.</p>
          </li>
        </ul>
        <div id="intro-text">
          <h2>Share and sell your digital content <br />with just a link.</h2>
          <p id="description">Selling stuff has always been a pain. No longer! Get back to creating. <br />We make selling stuff as easy as sharing a link.</p>
        </div>
        <form id="large-form" onSubmit={handleSignup} className='signup'>
          {showError ? (
            <h3>Sign up for Gumroad <small className="error">{errorMessage}</small></h3>
          ) : (
            <h3>Sign up for Gumroad <small>Fill in the simple form below and start selling in minutes</small></h3>
          )}
          <input type="text" placeholder="Email Address" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit">Start selling!</button>
          <div className="rainbow bar"></div>
        </form>
      </div>
      <div id="press">
        <div className="testimonial">
          <blockquote>
            &#8220;Incredibly easy&hellip; in fact, just writing this, I&#8217;m coming up with ideas and kicking myself for having not sold things in the past. Fortunately, moving forward, I won&#8217;t have to kick myself anymore.&#8221;
          </blockquote>
          <span className="writer">
            Brad McCarty - <a href="http://thenextweb.com/apps/2011/04/09/gumroad-sell-digital-goods-with-a-link-no-storefront-needed/">The Next Web</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
