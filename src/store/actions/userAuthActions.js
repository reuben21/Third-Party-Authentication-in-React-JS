import * as actionTypes from './actionTypes';
import firebase from "../../firebaseConfig/firebaseConfig";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (refreshToken, userType, userId, emailId, phoneNumber) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        refreshToken: refreshToken,
        userType: userType,
        userId: userId,
        emailId: emailId,
        phoneNumber: phoneNumber

    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error

    };
}

export const logout = () => {
    // console.log("ENTERED ACTIONS?AUTH JS LOGOUT")

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('emailId');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('expirationDate');

    firebase.auth().signOut()

    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())

        }, expirationTime * 1000)
    }
}

export const userAuthentication = () => {
    return dispatch => {
        dispatch(authStart());
        const emailId = firebase.auth().currentUser.email;
        const refreshToken = firebase.auth().currentUser.refreshToken;
        const userId = firebase.auth().currentUser.uid;
        const phoneNumber = firebase.auth().currentUser.phoneNumber;

        const userType = "";
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem('refreshToken', firebase.auth().currentUser.refreshToken);
        localStorage.setItem('userId', firebase.auth().currentUser.uid);
        localStorage.setItem('userType', userType);
        localStorage.setItem('emailId', firebase.auth().currentUser.email);
        localStorage.setItem('phoneNumber', firebase.auth().currentUser.phoneNumber);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(refreshToken, userType, userId, emailId, phoneNumber))
        dispatch(checkAuthTimeout(3600));


    };
}

export const authCheckState = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {

            if (user === null || user === 'undefined') {



                dispatch(logout())
            } else {

                const refreshToken = user.refreshToken;
                const userId = user.uid;

                const userType = "";

                const emailId = user.email;
                const phoneNumber =user.phoneNumber;



                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= Date()) {
                    dispatch(logout())
                } else {
                    dispatch(authSuccess(refreshToken, userType, userId, emailId, phoneNumber))
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
                }
            }
            // console.log("user", user)


        })

    }
}



