import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";

import { matchRoutes } from "../components/Routes";

import Loading from "../components/Authentication/Loading";
import AuthInput from "../components/Authentication/AuthInput";
import axios from "axios";
import { processError ,BACKEND_URL} from "../utils/api";

import { useSelector } from "react-redux";

import { selectAuthenticationState } from "../components/Authentication/AuthSlice.js";

import {
    getAuthUser,
    initializeAuthentication,
    isUserAuthenticated,
} from "../components/Authentication/authenticationService.js";
import PaymentGuard from "../components/stripe/PaymentGuard";

async function checkUserPaid(email) {
    let backendUrl = BACKEND_URL + "/userscheckUserPaid";
    try {
        let data = await axios.get(backendUrl, { params: { emailId: email } });
        return data.data;
    } catch (e) {
        return Promise.reject(processError(e));
    }
}

export default function MiddleWare({ children }) {
    const location = useLocation();

    const authenticationState = useSelector(selectAuthenticationState);

    const [loadCount, setloadCount] = useState(0);
    const [userpaid, setuserpaid] = useState(true);

    useEffect(() => {
        initializeAuthentication();
    }, []);
    useEffect(() => {
        if (authenticationState.isLoading) return;
        let user = getAuthUser();
        if (user?.email) {
            setloadCount((r) => r + 1);
            checkUserPaid(user.email).then((r) => {
                setuserpaid(r?.userIsPaid);
                setloadCount((r) => r - 1);
            });
        }
    }, [authenticationState]);

    const loadProperComp = (children) => {
        if (!matchRoutes(location.pathname)) {
            return children;
        } else if (!isUserAuthenticated()) {
            return <AuthInput />;
        } else if (!userpaid) {
            return <PaymentGuard />;
        } else {
            return children;
        }
    };

    if (authenticationState.isLoading || loadCount > 0) {
        return (
            <>
                <Loading />
                <div style={{ display: "none" }}>{children}</div>
            </>
        );
    }

    return loadProperComp(children);
}
