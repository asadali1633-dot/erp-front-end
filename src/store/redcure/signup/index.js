import {
    SIGNUP_DATA_START,
    SIGNUP_DATA,
    SINGUP_DATA_END
} from '../../action/types'

const initState = {
  user_registration: [],
  loading: false,
}

const Red_SignUp = (state = initState, action) => {
    switch (action.type) {
        case SIGNUP_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case SIGNUP_DATA:
            return {
                ...state,
                user_registration: action.payload,
                loading: action.loading,
            };
        case SINGUP_DATA_END:
            return {
                ...state,
                user_registration: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_SignUp