import constants from "../constants/message"

const initialState = {
    messages: [],
    users: [],
    isLoaded: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.SET_MESSAGES:
            return {
                ...state, messages: payload, isLoaded: true
            };
        case constants.SET_USERS:
            return {
                ...state, users: payload, isLoaded: true
            };
        default:
            return state;
    }
};