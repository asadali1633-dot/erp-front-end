import {
    PERMISSION_DATA_START,
    PERMISSION_DATA,
    PERMISSION_ALL_DATA,
    PERMISSION_DATA_END
} from '../../action/types'

const initState = {
  data: [],
  loading: false,
}

const Red_Permission = (state = initState, action) => {
    switch (action.type) {
        case PERMISSION_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case PERMISSION_DATA:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case PERMISSION_DATA_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Permission