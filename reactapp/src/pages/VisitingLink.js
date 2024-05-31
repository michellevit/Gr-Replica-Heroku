import React, { useState } from 'react';

const VisitingLink = ({
  permalink,
  name,
  userName,
  description,
  previewUrl,
  price,
  expiryMonth,
  expiryYear,
  handleSubmit
}) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryMonth, setCardExpiryMonth] = useState(expiryMonth);
  const [cardExpiryYear, setCardExpiryYear] = useState(expiryYear);
  const [cardSecurityCode, setCardSecurityCode] = useState('');

  const processPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/l/${permalink}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          card_number: cardNumber,
          date_month: cardExpiryMonth,
          date_year: cardExpiryYear,
          card_security_code: cardSecurityCode,
        }).toString(),
      });

      const data = await response.json();

      if (data.success) {
        setErrorMessage('');
        window.location.href = data.redirect_url;
      } else {
        setErrorMessage(data.error_message);
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing your payment.');
      setShowError(true);
    }
  };

  return (
    <div>
      <div id="link-content">
        <div id="header">
          <a href="/"><h1 id="logo">Gumroad</h1></a>
          <p>{name}{userName && ` from ${userName}`}</p>
        </div>

        {(description || previewUrl) && (
          <div id="description-box">
            <p>{description}</p>
          </div>
        )}

        <form id="large-form" name="large-form" onSubmit={processPayment}>
          {previewUrl && <a href={previewUrl} id="preview_link" target="_blank" rel="noopener noreferrer">preview</a>}

          <h3>Pay ${price}</h3>

          {showError && <h3 className="error">{errorMessage}</h3>}
          <p>
            <label htmlFor="card_number">Card Number:</label>
            <input
              id="card_number"
              name="card_number"
              placeholder="Card number"
              size="30"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </p>

          <p id="expiry_p">
            <label htmlFor="date_month">Card Expiry Date:</label>
            <select
              id="date_month"
              name="date_month"
              value={cardExpiryMonth}
              onChange={(e) => setCardExpiryMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>{new Date(0, month - 1).toLocaleString('en', { month: 'long' })}</option>
              ))}
            </select>
            <span id="slash">/</span>
            <select
              id="date_year"
              name="date_year"
              value={cardExpiryYear}
              onChange={(e) => setCardExpiryYear(e.target.value)}
            >
              {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </p>

          <p>
            <label htmlFor="card_security_code">Card Security Code:</label>
            <input
              id="card_security_code"
              name="card_security_code"
              placeholder="Security code"
              size="10"
              type="text"
              value={cardSecurityCode}
              onChange={(e) => setCardSecurityCode(e.target.value)}
            />
          </p>

          <p className="last-p"><button type="submit" id="submit_button">Pay</button></p>

          <div className="rainbow bar"></div>
        </form>
      </div>
    </div>
  );
};

export default VisitingLink;
