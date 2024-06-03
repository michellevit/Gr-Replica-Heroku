import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentAddress, setPaymentAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPaymentAddress(user.payment_address || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/update_user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, payment_address: paymentAddress }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to update user details.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form id="large-form" onSubmit={handleSubmit}>
        {errorMessage ? (
          <h3>Your account settings <small className="error">{errorMessage}</small></h3>
        ) : (
          <h3>Your account settings <small>a setting you can't change: how awesome you are</small></h3>
        )}
        <p>
          <label htmlFor="name">Full name: </label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </p>
        <p>
          <label htmlFor="email">Email address: </label>
          <input 
            id="email" 
            name="email" 
            type="text" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </p>
        <p>
          <label htmlFor="payment_address">PayPal address: </label>
          <input 
            id="payment_address" 
            name="payment_address" 
            type="text" 
            placeholder="PayPal Address" 
            value={paymentAddress} 
            onChange={(e) => setPaymentAddress(e.target.value)} 
          />
        </p>
        <p>
          <button type="submit">Update account details</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default Settings;
