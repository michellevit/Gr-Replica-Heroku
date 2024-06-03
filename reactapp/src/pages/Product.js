import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Product.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Product = () => {
  const { permalink } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/links/${permalink}/details`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setErrorMessage("Error fetching product details.");
      }
    };

    fetchProduct();
  }, [permalink]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const isImageFile = (url) => {
    return /\.(jpg|jpeg|png)$/i.test(url);
  };

  return (
    <div id="link-content">
      <div id="header">
        <a href="/">
          <h1 id="logo">Gumroad</h1>
        </a>
      </div>

      {product.description && (
        <div id="description-box">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          {isImageFile(product.preview_url) && (
            <div id="image-box">
              <img
                src={product.preview_url}
                alt={product.name}
                className="product-image"
              />
            </div>
          )}
        </div>
      )}

      <Elements stripe={stripePromise}>
        <CheckoutForm product={product} />
      </Elements>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const email = event.target.email.value;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/links/${product.unique_permalink}/purchase`,
        {
          stripeToken: paymentMethod.id,
          stripeEmail: email,
        }
      );

      if (response.data.success) {
        window.location.href = response.data.redirect_url;
      } else {
        setError(response.data.error_message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} id="large-form">
      <h3>Pay ${product.price.toFixed(2)}</h3>

      <p>
        <label htmlFor="email" id="checkout">Email:</label>
        <input id="email" name="email" type="email" required />
      </p>

      <p>
        <label htmlFor="card_number" id="checkout">Card Number:</label>
        <CardElement id="card_number" />
      </p>

      <p className="last-p">
        <button
          type="submit"
          id="submit_button"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay $${product.price.toFixed(2)}`}
        </button>
      </p>

      <div className="rainbow bar"></div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Product;
