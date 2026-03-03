import {
    ASSETS_DATA_START,
    HARDWARE_ASSETS_DATA,
    ASSETS_DATA_END,
    USERS_ASSETS_DATA,
    BRANDSMANUFACTURER_ASSETS_DATA,
    HARDWARE_SINGLE_DATA,
    ASSETS_DEPARTMENTS_DATA,
    ASSETS_BAR_CODE
} from '../../action/types'

const initState = {
    Users: [],
    BrandsManufacturer: [],
    hardwareData: [],
    HardwareSingleData:[],
    Departs:[],
    barcode: [],
    loading: false,
}

const Red_Assets = (state = initState, action) => {
    switch (action.type) {
        case ASSETS_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case USERS_ASSETS_DATA:
            return {
                ...state,
                Users: action.payload,
                loading: action.loading,
            };
        case BRANDSMANUFACTURER_ASSETS_DATA:
            return {
                ...state,
                BrandsManufacturer: action.payload,
                loading: action.loading,
            };
        case HARDWARE_ASSETS_DATA:
            return {
                ...state,
                hardwareData: action.payload,
                loading: action.loading,
            };
        case HARDWARE_SINGLE_DATA:
            return {
                ...state,
                HardwareSingleData: action.payload,
                loading: action.loading,
            };
        case ASSETS_DEPARTMENTS_DATA:
            return {
                ...state,
                Departs: action.payload,
                loading: action.loading,
            };
        case ASSETS_BAR_CODE:
            return {
                ...state,
                barcode: action.payload,
                loading: action.loading,
            };
        case ASSETS_DATA_END:
            return {
                ...state,
                Users: action.payload,
                BrandsManufacturer: action.payload,
                hardwareData: action.payload,
                HardwareSingleData: action.payload,
                Departs: action.payload,
                barcode: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Assets