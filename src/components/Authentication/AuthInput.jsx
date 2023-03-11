import React, { useState } from 'react'
import styles from './auth.module.css'
import { LoginCard } from './manualInput/LoginCard'
import SignUp from './manualInput/SignUp'
import { signInWithFaceBook, signInWithGoogle } from './authenticationService'

function AuthInput(props) {
    const [isSignUp, setIsSignUp] = useState(false)
    return (
        <>
            <div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.auth_back_card}>

                        <div className={styles.auth_card}>

                            {
                                isSignUp ? (<SignUp {...props} />) : (<LoginCard {...props} />)
                            }


                            <ul className="tabs tabs--block">
                                <li className={`tabs__item ${!isSignUp ? "tabs__item--active" : ""}`} onClick={() => setIsSignUp(false)}>Login</li>
                                <li className={`tabs__item ${isSignUp ? "tabs__item--active" : ""}`} onClick={() => setIsSignUp(true)}>SignUp</li>
                            </ul>
                        </div>
                        <hr className={styles.hr_tabbed} />
                        <button className={`${styles.login__btn} ${styles.login__google}`} onClick={() => signInWithGoogle()}>
                            Login with Google
                        </button>
                        <button className={`${styles.login__btn} ${styles.login__fb}`} onClick={() => signInWithFaceBook()}>
                            Login with Facebook
                        </button>


                    </div>

                </div>
            </div>
        </>
    )
}

export default AuthInput
