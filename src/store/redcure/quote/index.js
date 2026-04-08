import {
    QUOTE_DATA_START,
    QUOTE_SIGNLE_DATA,
    QUOTE_GET_ALL_DATA,
    QUOTE_SIMPLE_LIST_DATA,
    QUOTE_DATA_END
} from '../../action/types'

const initState = {
    getAllDataWithPage: [],
    GetByIdData: [],
    QuoteSimpleList: []
}

const Red_Quote = (state = initState, action) => {
    switch (action.type) {
        case QUOTE_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case QUOTE_GET_ALL_DATA:
            return {
                ...state,
                getAllDataWithPage: action.payload,
                loading: action.loading,
            };
        case QUOTE_SIGNLE_DATA:
            return {
                ...state,
                GetByIdData: action.payload,
                loading: action.loading,
            };
        case QUOTE_SIMPLE_LIST_DATA: 
            return {
                ...state,
                QuoteSimpleList:action.payload,
                loading: action.loading,
            }
        case QUOTE_DATA_END:
            return {
                ...state,
                getAllDataWithPage: action.payload,
                QuoteSimpleList:action.payload,
                GetByIdData: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Quote