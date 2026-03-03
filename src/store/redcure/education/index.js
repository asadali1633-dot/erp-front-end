import {
    EDU_DATA_START,
    EDU_DATA,
    EDU_DATA_END,
    EDU_SINGLE_DATA,
    EDU_MY_DATA,
    EDU_EMP_DATA,
    // =====================
    EDU_SUPER_ADMIN,
    EDU_SINGLE_SUPER_ADMIN
} from '../../action/types'

const initState = {
    singleEducation: [],
    myEducation: [],
    // ========================
    SuperAdminEdducationData:[],
    getSuperAdminSingleEducation:[],
    // =====================
    getEmpEducationData: [],
    loading: false,
}

const Red_Education = (state = initState, action) => {
    switch (action.type) {
        case EDU_DATA_START:
            return {
                ...state,
                loading: action.loading,
            };

        case EDU_SUPER_ADMIN:
            return {
                ...state,
                SuperAdminEdducationData: action.payload,
                loading: action.loading,
            };
        case EDU_SINGLE_SUPER_ADMIN:
            return {
                ...state,
                getSuperAdminSingleEducation: action.payload,
                loading: action.loading,
            };

        case EDU_SINGLE_DATA: 
            return {
                ...state,
                singleEducation: action.payload,
                loading : action.loading,
            }

        case EDU_MY_DATA: 
            return {
                ...state,
                myEducation: action.payload,
                loading : action.loading,
            }
        case EDU_EMP_DATA: 
            return {
                ...state,
                getEmpEducationData: action.payload,
                loading : action.loading,
            }

        case EDU_DATA_END:
            return {
                ...state,
                SuperAdminEdducationData:  action.payload,
                getSuperAdminSingleEducation: action.payload,
                // ========================
                myEducation: action.payload,
                singleEducation: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default Red_Education