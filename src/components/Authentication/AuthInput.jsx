import React, { useState } from 'react'
import { signInWithGoogle, signInWithFacebook } from './auth'
import styles from './auth.module.css'
import { LoginCard } from './manualInput/LoginCard'
import SignUp from './manualInput/SignUp'

function AuthInput(props) {
    const [isSignUp, setIsSignUp] = useState(false)
    const setLoadingCallMethod =(method)=>{
        const {loadingHandle}  = props
        loadingHandle.setLoading(true)

        method()
    }
    return (
        <>
            <div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.auth_back_card}>

                        <div className={styles.auth_card}>

                            {
                                isSignUp ? (<SignUp {... props}/>) : (<LoginCard {... props}/>)
                            }


                            <ul className="tabs tabs--block">
                                <li className={`tabs__item ${!isSignUp ? "tabs__item--active" : ""}`} onClick={() => setIsSignUp(false)}>Login</li>
                                <li className={`tabs__item ${isSignUp ? "tabs__item--active" : ""}`} onClick={() => setIsSignUp(true)}>SignUp</li>
                            </ul>
                        </div>
                        <hr className={styles.hr_tabbed} />
                        <button className={`${styles.login__btn} ${styles.login__google}`} onClick={()=>setLoadingCallMethod(signInWithGoogle)}>
                            Login with Google
                        </button>
                        <button className={`${styles.login__btn} ${styles.login__fb}`} onClick={()=>setLoadingCallMethod(signInWithFacebook)}>
                            Login with Facebook
                        </button>


                    </div>

                </div>
            </div>
        </>
    )
}

export default AuthInput
