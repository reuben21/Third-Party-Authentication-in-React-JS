import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.HOSPITAL_AUTH_START
    };
}

export const authSuccess = (token, user_type,user_id) => {
    return {
        type: actionTypes.HOSPITAL_AUTH_SUCCESS,
        token: token,
        user_type: user_type,
        user_id: user_id,

    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.HOSPITAL_AUTH_FAIL,
        error: error

    };
}

export const logout = () => {
    // console.log("ENTERED ACTIONS?AUTH JS LOGOUT")
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
    return {
        type: actionTypes.HOSPITAL_AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())

        }, expirationTime * 1000)
    }
}

export const hospitalAuthLogin = (email_id, password) => {
    return dispatch => {
        dispatch(authStart());
        fetch('http://127.0.0.1:4000/login/hospital', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                hospitalId: email_id,
                hospitalPassword: password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const token = data.token;
                const user_id = data.userId;
                const user_type = "Hospital";
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

                localStorage.setItem('token', token);
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('user_type', user_type);

                localStorage.setItem('expirationDate', expirationDate);
                 dispatch(authSuccess(token,user_type,user_id ))
                dispatch(checkAuthTimeout(3600));

            })
            .catch((error) => {
                dispatch(authFail(error))
                console.log(error);
            });


    };
}

export const hospitalAuthSignup = (hospitalName, email, Phone, password,hospitalAddress, clinic_coordinates) => {
    return dispatch => {
        dispatch(authStart());
        const dataReceivedAfterSubmitting = fetch("http://localhost:4000/register/hospital", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "hospitalName": hospitalName,
                    "hospitalId": email,
                    "hospitalPhone": Phone,
                    "hospitalPassword": password,
                    "hospitalAddress": String(hospitalAddress),
                    "hospitalCoordinates": {
                        "type":"Point",
                        "coordinates":clinic_coordinates,
                    }
                }),
            },
        )
            .then(resp => resp.json())
            .then(data => {
                console.log(data)

                return data


            })
            .catch((error) => {
                dispatch(authFail(error))
               return error;
            });
        return dataReceivedAfterSubmitting;


    };
}



export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const admin_priority = localStorage.getItem('admin_priority');
        const subscriber_priority = localStorage.getItem('subscriber_priority');
        const journalist_priority = localStorage.getItem('journalist_priority');
        console.log("AUTH CHECK STATE ", token);
        if (token === null || token === 'undefined') {

            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token, admin_priority,subscriber_priority,journalist_priority))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}



