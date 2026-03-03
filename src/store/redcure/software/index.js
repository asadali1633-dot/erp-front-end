import {
    SOFTWARE_DATA_START,
    SOFTWARE_DATA,
    SOFTWARE_SINGLE_DATA,
    SOFTWARE_DATA_END,
} from '../../action/types'

const initState = {
    softwareData: [],
    softwareSingle: [],
    loading: false,
}

const Red_Software = (state = initState, action) => {
    switch (action.type) {
        case SOFTWARE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case SOFTWARE_DATA:
            return {
                ...state,
                softwareData: action.payload,
                loading: action.loading,
            };
        case SOFTWARE_SINGLE_DATA:
            return {
                ...state,
                softwareSingle: action.payload,
                loading: action.loading,
            };
        case SOFTWARE_DATA_END:
            return {
                ...state,
                softwareData: action.payload,
                softwareSingle: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Software