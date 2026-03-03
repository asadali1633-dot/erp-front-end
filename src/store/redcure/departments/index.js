import {
    DEPART_DATA_START,
    DEPART_DATA,
    DEPART_SINGLE_DATA,
    DEPART_DATA_END,
} from '../../action/types'

const initState = {
    UserDepartment: [],
    loading: false,
}

const Red_Depart = (state = initState, action) => {
    switch (action.type) {
        case DEPART_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case DEPART_DATA:
            return {
                ...state,
                UserDepartment: action.payload,
                loading: action.loading,
            };
        case DEPART_DATA_END:
            return {
                ...state,
                UserDepartment: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Depart