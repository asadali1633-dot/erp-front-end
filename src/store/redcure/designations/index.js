import {
    DESIGNATOINS_DATA_START,
    DESIGNATOINS_DATA,
    DESIGNATOINS_SINGLE_DATA,
    DESIGNATOINS_DATA_END,
} from '../../action/types'

const initState = {
    DesignationsData: [],
    loading: false,
}

const Red_Designations = (state = initState, action) => {
    switch (action.type) {
        case DESIGNATOINS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case DESIGNATOINS_DATA:
            return {
                ...state,
                DesignationsData: action.payload,
                loading: action.loading,
            };
        case DESIGNATOINS_DATA_END:
            return {
                ...state,
                roleData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Designations