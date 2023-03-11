import React, { useEffect } from 'react'
import { OverlayDialog } from '../../overlayDialog/overlayDialog'
import styles from '../auth.module.css'
import { sendConfirmEmail, waitUntilEmailIsConfrimed } from '../authenticationService'


const loadingFix = {
    paddingLeft: "20px",
    paddingBottom: "20px",
}

const EmailNotVerified = () => {
    useEffect(() => {
        waitUntilEmailIsConfrimed()
    },
        [])
    const dataHtml = (

        <div className={styles.loader}>
            <div className={styles.inner} />
        </div>
    )
    return (
        <OverlayDialog>
            <div style={loadingFix}>
                {dataHtml}
            </div>
            <p>
                Please verify your email
            </p>
            <button class="button button--outline button--warning" onClick={
                () => sendConfirmEmail()
            }>Resend Mail</button>
        </OverlayDialog>
    )
}

export default EmailNotVerified
