import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/stripe/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51MgURFSIuLDem4hHJZPfYmpFi3RHwPL4fe8JJn9kkJqDxH8T9amlVMfCJmk7PcpbTxAZLUXAe6bbqRi2oVCAkYJO00qqT0x0Jb"
);
import { selectAuthenticationState } from "../components/Authentication/AuthSlice.js";

const StripeDemo = () => {
  const [clientSecret, setclientSecret] = useState("");
  const authenticationState = useSelector(selectAuthenticationState);
  useEffect(() => {
    let parsedUser = JSON.parse(authenticationState.authUser);
    if (!parsedUser?.email) return;

    console.log(parsedUser);

    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: parsedUser.email,
        items: [{ id: "xl-tshirt" }],
      }),
    })
      .then((r) => r.json())
      .then((res) => setclientSecret(res.clientSecret));
  }, [authenticationState]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="container-md ">
      <div className="fs-3">Please pay for your subscription</div>
      <div className="mt-3">
        {clientSecret && !authenticationState.isLoading && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default StripeDemo;
