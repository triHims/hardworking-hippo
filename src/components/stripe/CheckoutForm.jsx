import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setmessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then((paymentIntent) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setmessage("Payment succeeded!");
          break;
        case "processing":
          setmessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setmessage("Your payment was not successful, please try again.");
          break;
        default:
          setmessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    console.log(stripe);
    setisLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setmessage(error.message);
    } else {
      setmessage("Unexpected Error");
    }
    setisLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        type="button"
        className="mt-2 btn btn-primary"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        onClick={handleSubmit}
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner-border text-light" id="spinner"></div>
          ) : (
            "Pay Now"
          )}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
