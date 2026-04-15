import {
    VENDORS_DATA_START,
    VENDORS_SIGNLE_DATA,
    VENDORS_LIST_DATA,
    VENDORS_GET_ALL_DATA,
    VENDORS_DATA_END,
} from '../../action/types'

const initState = {
    VendorListSimple: [],
    VendorListWithPage: [],
    VendorSingle: [],
}

const Red_Vendors = (state = initState, action) => {
    switch (action.type) {
        case VENDORS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case VENDORS_LIST_DATA:
            return {
                ...state,
                VendorListSimple: action.payload,
                loading: action.loading,
            };
        case VENDORS_GET_ALL_DATA:
            return {
                ...state,
                VendorListWithPage: action.payload,
                loading: action.loading,
            };
        case VENDORS_SIGNLE_DATA:
            return {
                ...state,
                VendorSingle: action.payload,
                loading: action.loading,
            };
        case VENDORS_DATA_END:
            return {
                ...state,
                VendorListSimple: action.payload,
                VendorListWithPage: action.payload,
                VendorSingle: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Vendors