import { firebaseLogout as firebaseLogout, initializeFirebase, firebaseSignInWithFacebook, firebaseSignInUserEmailNPass, firebaseCreateUserEmailNPass, firebaseSignInWithGoogle, firebaseSendPasswordResetLink, firebaseGetConfirmEmailLink, firebaseAfterConfirmApplyCode, firebaseChangePassword } from './auth_firebase.js'

import store from '../store.js'

import { authSlice } from './AuthSlice'



var __authHandle


const { loading, unauthorized, authorized, emailNotConfirm } = authSlice.actions

const confirmLoginPromise = async (callback = () => { }) => {
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

    let result = await prom

    callback(result)

    cancel();


    return result
}


const confirmEmailPromise = async (success = () => { }, failure = () => { }) => {
    let cancel;
    let timeOutHandle;
    let prom = new Promise((resolve, reject) => {
        cancel = __authHandle.onAuthStateChanged(user => {
            if (user?.emailVerified) {
                resolve(user)
            }
        }, err => {
            reject(err)
        });

        timeOutHandle = setTimeout(() => {
            !!reject && reject("Time out")
        }, 600000)
    }
    )

    try {
        let result = await prom
        success(user)

    } catch (error) {
        failure()
    } finally {
        cancel && cancel();
        timeOutHandle && timeOutHandle();

    }

}


const userStateDispachFlow = (user) => {

    let authUser = user
    console.log("printuser")

    if (authUser.providerData[0].providerId === "password"
        && authUser.emailVerified === false) {
        console.log("reached to Email not verified")
        store.dispatch(emailNotConfirm(JSON.stringify(user)))


    } else {
        store.dispatch(authorized(JSON.stringify(user)))
    }
}

export const initializeAuthentication = async () => {

    store.dispatch(loading())
    let auth = initializeFirebase();

    __authHandle = auth



    let user = await confirmLoginPromise()
    if (user?.email) {
        userStateDispachFlow(user)
    }
    else {
        store.dispatch(unauthorized())
    }
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


export const waitUntilEmailIsConfrimed = async () => {
    await sendConfirmEmail()

    confirmEmailPromise((user) => {
        store.dispatch(authorized(JSON.stringify(user)))
    },
        () => {
            logout()
        }
    )
}


export const sendConfirmEmail = async () => {

    let auth = __authHandle
    await firebaseGetConfirmEmailLink(auth)



}



export const signInUser = async (email, password) => {
    let auth = __authHandle
    store.dispatch(loading())
    let loginObj = await firebaseSignInUserEmailNPass(auth, email, password)
    if (loginObj?.user?.email) {
        userStateDispachFlow(loginObj.user)
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

export const sendPasswordResetLink = async (email, beforeFn = () => { }, afterFn = () => { }) => {
    beforeFn()
    let auth = __authHandle
    await firebaseSendPasswordResetLink(auth, email);
    afterFn();
}


export const changePasswordService = async (password) => {
    let auth = __authHandle
    let res = await firebaseChangePassword(auth.currentUser,password)

}

store.subscribe(() => {
    console.info(JSON.stringify(store.getState().authentication))
})



export const isUserAuthenticated = () => {
    let currentState = store.getState().authentication
    let authUser = JSON.parse(currentState.authUser);
    return authUser && authUser.email && !currentState.confirmEmail;
}




