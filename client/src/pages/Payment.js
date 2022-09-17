import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <p>complete your purchase</p>
      <Elements stripe={promise}>
        
      </Elements>
    </div>
  );
};

export default Payment;
