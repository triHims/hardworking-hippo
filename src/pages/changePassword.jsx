import React, { useEffect, useState } from 'react'

import styles from '../components/Authentication/auth.module.css'
import { changePasswordService, isUserAuthenticated } from '../components/Authentication/authenticationService'

import { selectAuthenticationState } from '../components/Authentication/AuthSlice.js'

import { useSelector } from 'react-redux'


const labelError = {
    color: "red",
}
const labelSuccess = {
    color: "green",
}

const changePassword = () => {

    const [allowed,setAllowed] = useState(true)
    const [passwordDuo, setPasswordDuo] = useState({
        password: '',
        confirmPassword: ''
    })

    const [message, setMessage] = useState({
        messageText: '',
        isError: false,
    })

    const authenticationState = useSelector(selectAuthenticationState)
    useEffect(() => {
        setAllowed(isUserAuthenticated())
    }, [authenticationState])


    const callChangePassword = async ({ password, confirmPassword }) => {
        console.info(password,confirmPassword)
        if (password !== confirmPassword) {
            setMessage({
                messageText: 'Passwords do not match',
                isError: true,
            })
            return;
        }

        await changePasswordService(password)

        setMessage({
            messageText: 'Password Change success ',
            isError: false,
        })

    }
    return (
        <>
            {allowed ? (<div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.auth_back_card}>

                        <div className={styles.auth_card}>
                            <h3>Change Password</h3>
                        </div>
                        <div className="card__body">
                            <div className={styles.input_box}>
                                <label htmlFor="Password">Password</label><br />
                                <input type="password" className={styles.input_text} value={passwordDuo.password}
                                    onChange={(e) => setPasswordDuo({ ...passwordDuo, password: e.target.value })} />
                            </div>
                            <div className={styles.input_box}>
                                <label htmlFor="confirmPassword">Confirm Password</label><br />
                                <input type="password" className={styles.input_text} value={passwordDuo.confirmPassword}
                                    onChange={(e) => setPasswordDuo({ ...passwordDuo, confirmPassword: e.target.value })} />
                            </div>
                        </div>
                        {
                            !!message.messageText && <label style={message.isError ? labelError : labelSuccess} htmlFor="Message">{message.messageText}</label>
                        }

                        <hr className={styles.hr_tabbed} />
                        <button onClick={() => callChangePassword(passwordDuo)} className="button button--danger">Change Password</button>


                    </div>

                </div>
            </div>) : (<p>NOT ALLOWED</p>)}

        </>
    )
}

export default changePassword
