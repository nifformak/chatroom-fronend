import constants from "../constants/dialog"

const initialState = {
    dialogs: [],
    isLoaded: false,
    activeDialog: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.SET_DIALOGS:
            return {
                ...state, dialogs: payload, isLoaded: true
            };
        case constants.SET_ACTIVE_DIALOG:
            return {
                ...state, activeDialog: payload
            };
        default:
            return state;
    }
};
