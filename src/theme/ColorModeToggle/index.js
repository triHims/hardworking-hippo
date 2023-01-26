import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import { logout } from '../../components/Authentication/authenticationService';

import { useSelector } from 'react-redux'

import {selectAuthenticationState} from '../../components/Authentication/AuthSlice.js'



export default function ColorModeToggleWrapper(props) {
    const authenticationState = useSelector(selectAuthenticationState)


    const logoutHTML = (<a style={{ marginRight: 15, cursor: "pointer", color: '#222222' }} onClick={() => logout()}>
        Logout
    </a>
    )


    const loginHTML = (<a style={{ marginRight: 15, cursor: "pointer", color: '#222222' }} onClick={() => window.location.assign('/login')}>
        Login
    </a>
    )

    const isAllow = () => {
        /* console.log(JSON.parse(authenticationState.authUser)?.email) */
        /* console.log(authenticationState) */
        return !!JSON.parse(authenticationState.authUser)?.email;
    };

    return (
        <>
            {isAllow() ? logoutHTML : loginHTML}

            <ColorModeToggle {...props} />
        </>
    );
}
