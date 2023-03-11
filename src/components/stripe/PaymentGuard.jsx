import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { processError,BACKEND_URL } from "../../utils/api";
import {STRIPE_PK} from "../../utils/constants";
import axios from 'axios'
const stripePromise = loadStripe(
    STRIPE_PK
);
import { selectAuthenticationState } from "../Authentication/AuthSlice.js";

async function getCouponDetails(coupon) {
    let backendUrl = BACKEND_URL + "/get_coupon";
    console.log("hi")
    try {
        let data = await axios.get(backendUrl, { params: { code: coupon } });
        console.log(data)
        return data.data;
    } catch (e) {
        return Promise.reject(processError(e));
    }

}

const DiscountComp = ({ setcoupon }) => {
    const [input, setinput] = useState("");
    const [message, setmessage] = useState("");

    const getCoupon = () => {
        getCouponDetails(input).then(r => {
            let message = `Coupon -${input} applied;`
            if (r?.type === "PERCENT") {
                message += "Discount " + r.percent_off + " %"

            } else {
                message += "Discount " + r.amount_off/100 + " " + r.currency
            }
            setmessage(message)
            setcoupon(input)

        }).catch(r => {
            console.error(r)
            setmessage("Invalid coupon name")
        })
    }


    return (
        <div>
            <div class="form-group">
                <label for="exampleInputEmail1">Enter coupon code</label>
                <input
                    class="form-control"
                    value={input}
                    onChange={(e) => setinput(e.target.value)}
                />
                <small id="emailHelp" class="form-text ">
                    {message}
                </small>
            </div>
            <button class="btn btn-outline-secondary mt-2" type="button" id="button-addon2" onClick={getCoupon}>Apply Coupon</button>
        </div>
    );
};

const PaymentGuard = () => {
    const [clientSecret, setclientSecret] = useState("");
    const authenticationState = useSelector(selectAuthenticationState);
    const [shouldpay, setshouldpay] = useState(false);
    const [coupon, setcoupon] = useState("");
    useEffect(() => {
        if (!shouldpay) return;
        let parsedUser = JSON.parse(authenticationState.authUser);
        if (!parsedUser?.email) return;

        let createIntentURL = process.env.BACKEND_URL + "/create-payment-intent";
        fetch(createIntentURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userEmail: parsedUser.email,
                coupon: coupon
            }),
        })
            .then((r) => r.json())
            .then((res) => setclientSecret(res.clientSecret));
    }, [authenticationState, shouldpay]);

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
            <DiscountComp setcoupon={setcoupon} /><br />
            {
                !shouldpay ?
                    (
                        <button class="btn btn-primary mt-2" type="button" id="button-addon2" onClick={r=>setshouldpay(!shouldpay)} >Pay Now</button>
                    ) : (
                        <div className="mt-3">
                            {clientSecret && !authenticationState.isLoading && (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>
                            )}
                        </div>

                    )

            }
        </div>
    );
};

export default PaymentGuard;
