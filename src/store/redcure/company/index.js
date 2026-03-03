import {
    COMPANY_DATA_START,
    COMPANY_DATA,
    COMPANY_DATA_END
} from '../../action/types'

const initState = {
  compnayData: [],
  loading: false,
}

const Red_Company = (state = initState, action) => {
    switch (action.type) {
        case COMPANY_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case COMPANY_DATA:
            return {
                ...state,
                compnayData: action.payload,
                loading: action.loading,
            };
        case COMPANY_DATA_END:
            return {
                ...state,
                compnayData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Company