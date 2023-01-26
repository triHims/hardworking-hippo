import React, { useState } from 'react'
import styles from './input.module.css'
import {createUser} from '../auth_firebase'

const SignUp = () => {
    const [credentails, setCredentails] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [isError,setIsError] = useState(true);
    const [errorMessage,setErrorMessage]= useState("")
    const validateAndCallCreate=({email,password,confirmPassword})=>{
        if(password!=confirmPassword){
            setErrorMessage("Passwords do not match")
            setIsError(true)
        }

        createUser(email,password);

    }

    const clearError = ()=>{
        isError && setIsError(false)
    }

    return (
        <div className="card">
            <div className="card__header">
                <h3>Sign Up</h3>
            </div>
            <div className="card__body">
                <div className={styles.input_box}>
                    <label htmlFor="email">Email</label><br />
                    <input type="text" className={styles.input_text} value={credentails.email} 
                        onChange={(e) => { clearError(); setCredentails({ ...credentails, email: e.target.value, }) }}/>
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className={styles.input_text} value={credentails.password}
                        onChange={(e) => { clearError(); setCredentails({ ...credentails, password: e.target.value, }) }} />

                </div>
                <div className={styles.input_box}>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" className={styles.input_text} value={credentails.confirmPassword } 
                        onChange={(e) => { clearError(); setCredentails({ ...credentails, confirmPassword: e.target.value, }) }} />
                </div>
                {
                 isError && <label className={styles.errorLabel} htmlFor="Error">{errorMessage}</label>
                }
            </div>
            <div className="card__footer">
                <button className="button button--secondary button--block" onClick={()=>{validateAndCallCreate(credentails)}}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp
