import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utitlity";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user_type: null,
    user_id:null


}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user_type: action.user_type,
        user_id: action.user_id,
        error: null,
        loading: false,
    });
}


const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        admin_priority: false,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PATIENT_AUTH_START:
            return authStart(state, action);
        case actionTypes.PATIENT_AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.PATIENT_AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.PATIENT_AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
