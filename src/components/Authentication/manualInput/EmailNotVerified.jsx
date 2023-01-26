import React from 'react'
import { OverlayDialog } from '../../overlayDialog/overlayDialog'
import styles from '../auth.module.css'


const loadingFix = {
    paddingLeft: "20px",
    paddingBottom: "20px",
}

const EmailNotVerified = () => {
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
        </OverlayDialog>
    )
}

export default EmailNotVerified
