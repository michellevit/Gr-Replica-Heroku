// reactapp/src/pages/Success.js

import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productUrl = params.get('product_url');

  return (
    <div>
      <h1>Payment Successful!</h1>
      {productUrl ? (
        <p>Thank you for your purchase. You can download your product <a href={productUrl} target="_blank" rel="noopener noreferrer">here</a>.</p>
      ) : (
        <p>No product URL provided.</p>
      )}
    </div>
  );
};

export default Success;
