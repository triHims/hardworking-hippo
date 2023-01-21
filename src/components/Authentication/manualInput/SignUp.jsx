import React from 'react'
import styles from './input.module.css'

const SignUp = ({loadingHandle}) => {
    return (
        <div className="card">
            <div className="card__header">
                <h3>Sign Up</h3>
            </div>
            <div className="card__body">
                <div className={styles.input_box}>
                    <label htmlFor="email">Email</label><br/>
                    <input type="text" className={styles.input_text} name="" id="" />
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className={styles.input_text} name="" id="" />
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" className={styles.input_text} name="" id="" />
                </div>
            </div>
            <div className="card__footer">
                <button className="button button--secondary button--block">Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp
