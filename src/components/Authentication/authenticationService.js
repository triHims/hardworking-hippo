import { firebaseLogout as firebaseLogout, initializeFirebase, firebaseSignInWithFacebook, firebaseSignInUserEmailNPass, firebaseCreateUserEmailNPass, firebaseSignInWithGoogle, firebaseSendPasswordResetLink } from './auth_firebase.js'
import React, { useRef, useReducer } from 'react'

import store from '../store.js'

import { authSlice } from './AuthSlice'



var __authHandle


const { loading, unauthorized, authorized, emailNotConfirm } = authSlice.actions

const onAuthStateChangePromise = () => {
    let cancel;
    let prom = new Promise((resolve, reject) =>
        cancel = __authHandle.onAuthStateChanged(user => {
            if (user?.email) {
                resolve(user)
            } else {
                resolve({})
            }
        }, err => {
            reject(err)
        })
    )

    return [prom, cancel]

}

export const initializeAuthentication = async () => {

    store.dispatch(loading())
    let auth = initializeFirebase();

    __authHandle = auth

    let [authStatePromise, cancel] = onAuthStateChangePromise()

    let user = await authStatePromise

    if (user?.email) {
        store.dispatch(authorized(JSON.stringify(auth.currentUser)))
    } else {
        store.dispatch(unauthorized())
    }

    //clean up onAuthStateChanged callback
    cancel()
}


export const signInWithFaceBook = async () => {
    let auth = __authHandle;
    store.dispatch(loading())
    let loginObj = await firebaseSignInWithFacebook(auth)


    if (loginObj?.user?.email) {
        store.dispatch(authorized(JSON.stringify(loginObj.user)))
    } else {
        store.dispatch(unauthorized())
    }
}
export const signInWithGoogle = async () => {
    let auth = __authHandle;
    store.dispatch(loading())
    let loginObj = await firebaseSignInWithGoogle(auth)


    if (loginObj?.user?.email) {
        store.dispatch(authorized(JSON.stringify(loginObj.user)))
    } else {
        store.dispatch(unauthorized())
    }
}


export const logout = async (callback) => {
    let auth = __authHandle
    store.dispatch(loading())
    firebaseLogout(auth)
    store.dispatch(unauthorized())
    !!callback && callback()
}


export const signInUser = async (email, password) => {
    let auth = __authHandle
    store.dispatch(loading())
    let loginObj = await firebaseSignInUserEmailNPass(auth, email, password)
    if (loginObj?.user?.email) {
        store.dispatch(authorized(JSON.stringify(loginObj.user)))
    } else {
        store.dispatch(unauthorized())
    }

}

export const createInUser = async (email, password) => {
    let auth = __authHandle
    store.dispatch(loading())
    let loginObj = await firebaseCreateUserEmailNPass(auth, email, password)
    if (loginObj?.user?.email) {
        store.dispatch(authorized(JSON.stringify(loginObj.user)))
    } else {
        store.dispatch(unauthorized())
    }

}

export const sendPasswordResetLink = async (email,beforeFn=()=>{},afterFn=()=>{}) => {
    beforeFn()
    let auth = __authHandle
    await firebaseSendPasswordResetLink(auth,email);
    afterFn();
}


store.subscribe(() => {
    console.log(store.getState())
})







