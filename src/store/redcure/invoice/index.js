import {
    INVOICE_DATA_START,
    INVOICE_SIGNLE_DATA,
    INVOICE_GET_ALL_DATA,
    INVOICE_SIMPLE_LIST_DATA,
    INVOICE_DATA_END
} from '../../action/types'

const initState = {
    getAllDataWithPage: [],
    getSingleData: [],

}

const Red_Invoice = (state = initState, action) => {
    switch (action.type) {
        case INVOICE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case INVOICE_GET_ALL_DATA:
            return {
                ...state,
                getAllDataWithPage: action.payload,
                loading: action.loading,
            };
        case INVOICE_SIGNLE_DATA:
            return {
                ...state,
                getSingleData: action.payload,
                loading: action.loading,
            };
        case INVOICE_DATA_END:
            return {
                ...state,
                getAllDataWithPage: action.payload,
                getSingleData: action.payload,
                loading: action.loading
            };

        default:
            return state;
    }
};

export default Red_Invoice