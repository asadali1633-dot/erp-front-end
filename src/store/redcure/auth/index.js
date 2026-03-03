import {
    SET_ACCESS_TOKEN,
    CLEAR_AUTH,
    SET_LOADING,
    SET_STEP,
    CLEAR_STEP
} from "../../action/types";
import { getStepCookie } from '../../../Routes/stepCookie'

const initState = {
    accessToken: null,
    isLoading: false,
    step: getStepCookie(),
};

const Red_Auth = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                isLoading: false,
            };
        case SET_STEP:
            return {
                ...state,
                step: action.payload,
            };

        case CLEAR_STEP:
            return {
                ...state,
                step: null,
            };

        case CLEAR_AUTH:
            return {
                ...state,
                accessToken: null,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default Red_Auth;
