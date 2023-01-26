import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import authStyles from "../Authentication/auth.module.css"
import overlayStyles from './overlay.module.css'


const loaderHTML = (children) => {

    return (
        <div className={overlayStyles.overlay}>

            <div className={overlayStyles.overlayContainer}>
                <div className={authStyles.overlayDoor} />

                <div className={overlayStyles.outcard}>
                    <div class="card">
                        <div class="card__body">
                            {children}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export const OverlayDialog = ({ children }) => {
    if (!document.getElementById('loader_hook')) {
        let element = document.createElement('div')
        element.setAttribute('id', "loader_hook")
        document.body.appendChild(element)
    }



    return ReactDOM.createPortal(
        loaderHTML(children),
        document.getElementById('loader_hook')
    )
}


