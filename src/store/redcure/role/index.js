import {
    ROLE_DATA_START,
    ROLE_DATA,
    ROLE_SINGLE_DATA,
    ROLE_DATA_END,
} from '../../action/types'

const initState = {
    roleData: [],
    loading: false,
}

const Red_Role = (state = initState, action) => {
    switch (action.type) {
        case ROLE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case ROLE_DATA:
            return {
                ...state,
                roleData: action.payload,
                loading: action.loading,
            };
        case ROLE_DATA_END:
            return {
                ...state,
                roleData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Role