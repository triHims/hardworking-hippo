import React from 'react'
import AuthInput from '../components/Authentication/AuthInput';
import { useSelector } from 'react-redux'
import { selectAuthenticationState } from '../components/Authentication/AuthSlice.js'

const login = () => {
    const authenticationState = useSelector(selectAuthenticationState)
    const isAllow = () => {
        /* console.log(JSON.parse(authenticationState.authUser)?.email) */
        /* console.log(authenticationState) */
        return !!JSON.parse(authenticationState.authUser)?.email;
    };

    return (
        <>
            {
                !isAllow() ? <AuthInput /> : window.location.assign('/')}
        </>
    )
}

export default login
