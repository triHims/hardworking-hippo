import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

import { matchRoutes } from '../components/Routes';

import Loading from '../components/Authentication/Loading';
import AuthInput from '../components/Authentication/AuthInput';

import { useSelector } from 'react-redux'

import { selectAuthenticationState } from '../components/Authentication/AuthSlice.js'


import { initializeAuthentication } from '../components/Authentication/authenticationService.js'
import EmailNotVerified from '../components/Authentication/manualInput/EmailNotVerified';






export default function MiddleWare({ children }) {

    const location = useLocation();

    const authenticationState = useSelector(selectAuthenticationState)


    useEffect(() => {
        initializeAuthentication()
    }, [])


    const isAllow = () => {
        /* console.log(JSON.parse(authenticationState.authUser)?.email) */
        /* console.log(authenticationState) */
        return !matchRoutes(location.pathname) || JSON.parse(authenticationState.authUser)?.email;
    };

    if (authenticationState.isLoading) {
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
                    <AuthInput />
                )
            }
            <EmailNotVerified/>
        </>)


}
