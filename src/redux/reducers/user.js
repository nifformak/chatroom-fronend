import constants from "../constants/user"

const initialState = {
    id: null,
    name: null,
    loading: false,
    token: window.localStorage.token,
    isAuth: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.START_LOGIN_LOADING:
            return {
                loading: true
            };
        case constants.SET_USER:
            return {
                ...state,
                ...payload,
                loading: false,
                isAuth: true,
            };
        default:
            return state;
    }
};
