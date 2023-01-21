import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { auth } from '../components/Authentication/auth';

import { matchRoutes } from '../components/Routes';

import Loading from '../components/Authentication/Loading';
import AuthInput from '../components/Authentication/AuthInput';



export default function Root({ children }) {

    const location = useLocation();




    const [userAuth, setUserAuth] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authProgress, setAuthProgress] = useState(false)
    const loadingHandle = {
        isLoading: authLoading,
        setLoading: (input) => { setAuthLoading(input) }
    }

    const authProgressHandle = {
        authProgress,
        setAuthProgress
    }


    auth.onAuthStateChanged(async function(user) {
        if (user !== null) {
            setUserAuth(user);
        }
        console.log("Fired")

        setAuthLoading(false);
    });

    const isAllow = () => {
        return !matchRoutes(location.pathname) || userAuth?.email;
    };

    if (authLoading) {
        console.log("")
        return (
            <>
                <Loading />
                <div style={{ display: 'none' }}>{children}</div>
            </>
        );
    }

    return (

        <>
            {
                isAllow() ? (
                    <>
                        {children}
                    </>
                ) : (
                    <AuthInput authProgressHandle={authProgressHandle} loadingHandle={loadingHandle} />
                )
            }
        </>)

}
