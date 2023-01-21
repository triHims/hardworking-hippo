import React from 'react'
import styles from './input.module.css'

export const LoginCard = ({loadingHandle}) => {
    return (
        <div className="card">
            <div className="card__header">
                <h3>SignIn to your account</h3>
            </div>
            <div className="card__body">
                <div className={styles.input_box}>
                    <label htmlFor="email">Email</label><br/>
                    <input type="text" className={styles.input_text} name="" id="" />
                </div>
                <div className={styles.input_box}>
                    <label htmlFor="password">Password</label>
                    <input type="text" className={styles.input_text} name="" id="" />
                </div>
                <div className={styles.input_box_forgot}>
                    <a href="http://">forgot password ?</a>
                </div>
            </div>
            <div className="card__footer">
                <button className="button button--secondary button--block" onClick={()=>{
                    console.log("laoding before "+loadingHandle.isLoading)
                    loadingHandle.setLoading(true)
                    console.log("setLoaidn called")
                    console.log("laoding after "+loadingHandle.isLoading)
                }}>Log in</button>
            </div>
        </div>
    )
}
