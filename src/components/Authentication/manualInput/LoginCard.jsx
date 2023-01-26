import React, { useState } from 'react'
import styles from './input.module.css'

import { sendPasswordResetLink, signInUser } from '../authenticationService.js'
import { OverlayDialog } from '../../overlayDialog/overlayDialog'
import ForgotPassword from './ForgotPassword'


export const LoginCard = () => {
    const [credentails, setCredentails] = useState({
        email: '',
        password: '',
    })


    const [showForgotPass, setShowForgotPass] = useState(false)



    return (
        <div className="card">
            <div className="card__header">
                <h3>SignIn to your account</h3>
            </div>
            <div className="card__body">
                <div className={styles.input_box}>
                    <label htmlFor="email">Email</label><br />
                    <input type="text" className={styles.input_text} value={credentails.email}
                        onChange={(e) => setCredentails({ ...credentails, email: e.target.value, })} />
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className={styles.input_text} value={credentails.password}
                        onChange={(e) => setCredentails({ ...credentails, password: e.target.value, })} />
                </div>
                <div className={styles.input_box_forgot}>
                    <a onClick={() => setShowForgotPass(true)} >forgot password ?</a>
                </div>
            </div>
            <div className="card__footer">
                <button className="button button--secondary button--block" onClick={() => signInUser(credentails.email, credentails.password)}>Log in</button>
            </div>
            {showForgotPass && <ForgotPassword closeFn={() => setShowForgotPass(false)} />}
        </div>
    )
}
