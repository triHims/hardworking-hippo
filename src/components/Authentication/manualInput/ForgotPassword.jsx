import React, { useState } from 'react'
import { OverlayDialog } from '../../overlayDialog/overlayDialog'
import styles from '../auth.module.css'
import { sendPasswordResetLink } from '../authenticationService'

const ForgotPassword = ({ closeFn }) => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)

    const callPasswordReset = async (email) => {
        await sendPasswordResetLink(email)
        setSuccess(true)
    }

    const dataHtml = (
        <>
            <div className="card__header">
                <h3>Forgot password</h3>
            </div>
            <div className="card__body">
                <div className={styles.input_box}>
                    <label htmlFor="email">Email</label><br />
                    <input type="text" className={styles.input_text} value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

            </div>
            <div className="card__footer">
                <button className="button button--primary button--outline" onClick={() => callPasswordReset(email)}>Send Reset Link</button>
                <button className="button button--secondary button--outline" onClick={() => closeFn()}>Close</button>
            </div>
        </>

    )
    const dataSuccess = (
        <>
            <div className="card__header">
                <h3>Forgot password</h3>
            </div>
            <div className="card__body">
                Reset link sent. Please check you inbox
            </div>
            <div className="card__footer">
                <button className="button button--secondary button--block" onClick={() => closeFn()}>Close</button>
            </div>
        </>

    )
    return (
        <OverlayDialog>
            {success ? dataSuccess : dataHtml}
        </OverlayDialog>
    )
}

export default ForgotPassword
