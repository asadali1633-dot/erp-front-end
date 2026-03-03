import {
    EXPER_DATA_START,
    EXPER_DATA_END,
    // ======================
    EXPER_SUPER_ADMIN,
    EXPER_SINGLE_SUPER_ADMIN,
    // =======================
    EXPER_SINGLE_DATA,
    EXPER_MY_DATA,
    EXPER_EMP_DATA
} from '../../action/types'

const initState = {
    SuperAdminExperiance: [],
    singleSuperAdminExperiance: [],
    // ==========================
    getMyExper: [],
    singleExperDataEmp: [],
    empExper: [],

    
    loading: false,
}

const Red_Experiance = (state = initState, action) => {
    switch (action.type) {
        case EXPER_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };
        case EXPER_SUPER_ADMIN:
            return {
                ...state,
                SuperAdminExperiance: action.payload,
                loading: action.loading,
            };
        case EXPER_SINGLE_SUPER_ADMIN:
            return {
                ...state,
                singleSuperAdminExperiance: action.payload,
                loading: action.loading,
            };
        case EXPER_MY_DATA:
            return {
                ...state,
                getMyExper: action.payload,
                loading: action.loading,
            };
        case EXPER_SINGLE_DATA:
            return {
                ...state,
                singleExperDataEmp: action.payload,
                loading: action.loading,
            };
        case EXPER_EMP_DATA:
            return {
                ...state,
                empExper: action.payload,
                loading: action.loading,
            };
        case EXPER_DATA_END:
            return {
                ...state,
                SuperAdminExperiance: action.payload,
                singleSuperAdminExperiance: action.payload,
                getMyExper: action.payload,
                singleExperDataEmp: action.payload,
                empExper: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Experiance