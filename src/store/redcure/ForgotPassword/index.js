import {
    FORGOT_PASS_DATA_START,
    FORGOT_PASS_DATA,
    FORGOT_PASS_ALL_DATA,
    FORGOT_PASS_DATA_END,
} from '../../action/types'
import baseUrl from '../../../config.json'

const initState = {
  data: [],
  loading: false,
}


const Red_ForgotPassord = (state = initState, action) => {
    switch (action.type) {
        case FORGOT_PASS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case FORGOT_PASS_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case FORGOT_PASS_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_ForgotPassord