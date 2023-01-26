import React from 'react'
import AuthInput from '../components/Authentication/AuthInput';
import { isUserAuthenticated } from '../components/Authentication/authenticationService';

const login = () => {
    const isAllow = () => {
        /* console.log(JSON.parse(authenticationState.authUser)?.email) */
        /* console.log(authenticationState) */
        return isUserAuthenticated();
    };

    return (
        <>
            {!isAllow() ? <AuthInput /> : window.location.assign('/')}
        </>
    )
}

export default login
