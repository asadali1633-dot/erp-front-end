import {
    SIGNIN_DATA_START,
    SIGNIN_DATA,
    SIGNIN_DATA_END
} from '../../action/types'

const initState = {
  user: [],
  loading: false,
}

const Red_SignIn = (state = initState, action) => {
    switch (action.type) {
        case SIGNIN_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case SIGNIN_DATA:
            return {
                ...state,
                user: action.payload,
                loading: action.loading,
            };
        case SIGNIN_DATA_END:
            return {
                ...state,
                user: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_SignIn