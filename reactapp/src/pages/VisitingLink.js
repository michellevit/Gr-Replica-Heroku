import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const VisitingLink = ({ permalink, name, userName, description, previewUrl, price }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        permalink={permalink}
        name={name}
        userName={userName}
        description={description}
        previewUrl={previewUrl}
        price={price}
      />
    </Elements>
  );
};

const CheckoutForm = ({ permalink, name, userName, description, previewUrl, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const response = await fetch(`/api/links/${permalink}/process_payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stripeToken: paymentMethod.id }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      window.location.href = data.redirect_url;
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

        <form id="large-form" onSubmit={handleSubmit}>
          {previewUrl && <a href={previewUrl} id="preview_link" target="_blank" rel="noopener noreferrer">preview</a>}
          <h3>Pay ${price}</h3>

          {error && <h3 className="error">{error}</h3>}
          <CardElement />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : `Pay $${price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitingLink;
