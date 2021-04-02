import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utitlity";

const initialState = {
    token: null,
    error: null,
    loading: false,
    user_type: null,
    user_id:null


}

const hospitalAuthStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const hospitalAuthSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user_type: action.user_type,
        user_id: action.user_id,
        error: null,
        loading: false,
    });
}


const hospitalAuthFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

const hospitalAuthLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        admin_priority: false,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HOSPITAL_AUTH_START:
            return hospitalAuthStart(state, action);
        case actionTypes.HOSPITAL_AUTH_SUCCESS:
            return hospitalAuthSuccess(state, action);
        case actionTypes.HOSPITAL_AUTH_FAIL:
            return hospitalAuthFail(state, action);
        case actionTypes.HOSPITAL_AUTH_LOGOUT:
            return hospitalAuthLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
