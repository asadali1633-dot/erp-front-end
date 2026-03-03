import {
    VERIFICATION_DATA_START,
    VERIFICATION_DATA,
    VERIFICATION_DATA_END
} from '../../action/types'

const initState = {
  user_verifition: [],
  loading: false,
}

const Red_Verifition = (state = initState, action) => {
    switch (action.type) {
        case VERIFICATION_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case VERIFICATION_DATA:
            return {
                ...state,
                user_verifition: action.payload,
                loading: action.loading,
            };
        case VERIFICATION_DATA_END:
            return {
                ...state,
                user_verifition: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Verifition